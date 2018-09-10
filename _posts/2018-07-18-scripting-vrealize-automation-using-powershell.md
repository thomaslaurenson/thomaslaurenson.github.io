---
layout: post
title: "vRealize Automation 7 - Scripting REST API requests using PowerShell"
tags:
- vRealize
- vSphere
- PowerShell
thumbnail_path: blog/thumbs/virtualization.png
---

I finally found an answer to a problem that had plagued me for months! How to script, or automate, tasks in vRealize; for example, destroying a deployed blueprint. The answer was simpler than I initially thought... It turns out that the _Catalog Service_ REST API provides all that functionality that is required to automated specific tasks such as request a Blueprint to be deployed (built), get the IP address of a VM, or destroy a deployed blueprint.

At my workplace we use vSphere and vRealize to provide virtual machines to students for labs, assignments and exams. Since we are using VMs in this many areas, it means that is a high overhead of managing numerous VMs. Think of having a class of 50 students, with approximately 3-6 VMs per course... resulting in large numbers of VMs to manage! I have PowerCLI scripts to perform many tasks on vSphere, yet had no solution to managing vRealize deployments or blueprints directly. That was until I read [How to script a vRealize Automation 7 REST API request](http://www.vmtocloud.com/how-to-script-a-vrealize-automation-7-rest-api-request/), by Ryan Kelly. His vRealize Automation scripts were written in BASH... However, I wanted to use PowerShell. This is primarily due to my heavy use of the PowerCLI tool to manage vSphere, which is only available on Windows PowerShell.

This post goes into detail about how to write a PowerShell script to automate connection to the vRealize Automation REST API. This post finishes with the most simple task, to list the names of any vRealize deployments that the user has access to. The post has the following prerequisites:

- An account with access to a vRealize server
- Windows PowerShell

In addition, I have started add PowerShell scripts and modules to my [vSphereScripts
](https://github.com/thomaslaurenson/vSphereScripts) repository on GitHub. Like the currently available vSphere scripts, these are targeted to automated management of virtual machines.

## vRealize Automation 7 REST API Request Using PowerShell

The first thing to do is open _Windows PowerShell ISE_ or _Visual Studio Code_ and create a new file/script. Feel free to name it whatever you want, however, it is sensible to use the `.ps1` file extension to identify it as a PowerShell script.

### Connecting to a vRealize server

The first piece of information needed is the hostname of the vRealize server. For the sake of this tutorial, we will specify the following hostname: `https://vra01.corp.local/`. Add a line that sepcifies a variable named `$vra_server` that has the string of the server, for example:

{% highlight powershell %}
$vra_server = "https://vra01.corp.local/"
{% endhighlight %}

This value will be used multiple times, for each API request. So it makes sense to store the information in a variable.

In order to authenticate with the vRealize server, we must have valid credentials. We could use a simple approach to get the user credentials; either 1) Hard-code them into the script, or 2) Use the `Read-Host -Prompt` module. However, both of these are insecure. Instead, I recommend using the `Get-Credential` module, designed specifically for handling user credentials. The following code will ask the user for a username and password and store it in a `PSCredential` object. We can then extract the username and password from this object. Add the following line to your script.

{% highlight powershell %}
$credentials=Get-Credential -Message "Please enter your vRealize credentials"
{% endhighlight %}

The `Get-Credential` module can be a little finicky to deal with. We will need to extract data from the `PSCredential` object later in the script. Next, we must specify the tenant address for vRealize. We will, again, store this in a variable for later use.

{% highlight powershell %}
$tenant = "vsphere.local"
{% endhighlight %}

The tenant name should be `vsphere.local`, as [vRealize Automation requiquires vsphere.local as the default tenant name](https://docs.vmware.com/en/vRealize-Automation/6.2/com.vmware.vra.62.upgrade.doc/GUID-FE589514-85C9-401C-9DF1-2983F0D3AAD1.html). Ok, so far we have three key pieces of information: 1) Username, 2) Password and 3) Tenant. We must send this information, using a POST, to the REST API. We must also send this information in JSON format. So we should convert and combine the information into a single JSON object. The following code will perform this task, and store the information in a JSON object variable called `$data`:

{% highlight powershell %}
$data = @{
    username=$credentials.username
    password=$credentials.GetNetworkCredential().password
    tenant=$tenant
}
$data = $data | ConvertTo-Json
{% endhighlight %}

It is important to quickly summarise what just happened. The `username=$credentials.username` line populates the username from `$credentials` (the `PSCredential` object) into the hashtable. The password population is a little trickier. The password must be sent in plaintent, not a SecureString - as stored in the `PSCrential` object. The _Hey, Scripting Guy! Blog_ provided excellent advice on how to [decrypt PowerShell secure string passwords](https://blogs.technet.microsoft.com/heyscriptingguy/2013/03/26/decrypt-powershell-secure-string-password/) by using `GetNetworkCredential().password`. Finally, copying over the tenant information is a simple reference to the `$tenant` variable.

Next, we need to craft the URL to perform the POST to. The suffix of the URL is `identity/api/tokens`, which can simply be added to the `$vra_server` variable to get the full URL. For example, the end result will be the following URL:

{% highlight powershell %}
https://vra01.corp.local/identity/api/tokens
{% endhighlight %}

This is easily achieved using string concatenation:

{% highlight powershell %}
$uri = $vra_server + "identity/api/tokens"
{% endhighlight %}

We now need to specify the correct headers for the API request. We need to specify what type of data we are sending, and what type of data we want to receive back. In both cases we want to specify JSON. From my experience, the easiest and most flexible method is to use a dictionary to store multiple header variables. This is demonstrated in the following code.

{% highlight powershell %}
$header = New-Object "System.Collections.Generic.Dictionary[[String],[String]]"
$header.Add("Accept", 'application/json')
$header.Add("Content-Type", 'application/json')
{% endhighlight %}

To summarize, on the first line we create a new dictionary with the variable name `$header` that has a key type of string, and a value type of string. The second line specifies an `Accept` value of `application/json` so that we get JSON data back. The third line specifies a `Content-Type` of `application/json` so the server knows we are sending them JSON formatted data. 

Everything is now configured to actually perform authentication against the server and get a **bearer token to be used in every future API request**. This token is exceptionally important, and we can use it multiple times, until the token is expired. It is sent with an expiry time, so you can determine how long it is valid for. 

To perform authentication and get the bearer token, we can leverage the `Invoke-RestMethod` module, and perform a `-Method Post`. Basically, we want to post the `$data` JSON object to the `$uri`. In other words, we post the credentials and tenant to the URL of the REST API. We must also specify that the POST should use the `$header` value we previously specified. Basically, that we are sending JSON, and want JSON back in return. It is useful to grab the _response_, a JSON object, and store it in a variable. The variable name we will use is `$response`. The following line of code performs the POST:

{% highlight powershell %}
$response = Invoke-RestMethod -Method Post -Uri $uri -Headers $header -Body $data
{% endhighlight %}

This is a very simple one line solution. However, I prefer to wrap the REST request in a `try` and `catch` to check the result, so we have an idea if things go wrong. The following code snippet tries to perform the POST, and if it fails will print some useful information including the status code error, which can be very useful for debugging.

{% highlight powershell %}
try {
    $response = Invoke-RestMethod -Method Post -Uri $uri -Headers $header -Body $data
} catch {
    Write-Host "StatusCode:" $_.Exception.Response.StatusCode.value__
    Write-Host "StatusDescription:" $_.Exception.Response.StatusDescription
    exit
}
{% endhighlight %}

The final part, we need to extract the bearer token from the JSON we received back from the server. The `$response` variable will contain three values: 1) `expires` is a string value of when the token will expire, 2) `tenant` is another string value of the current tenant which should be `vsphere.local`, and 3) `id` which is a string value of the bearer token - **this is the value we want!** You can easily extract the bearer token using the following code:

{% highlight powershell %}
$bearer_token = $response.id
{% endhighlight %}

However, this approach has a major drawback... It is not in the correct format for subsequent REST requests. Any subsequent REST API requests will want the bearer token with a string `Bearer` before the actual token. For example: `Bearer 89ry29h293930r8uru`. We can leverage some string concatenation to achieve this:

```
$bearer_token = "Bearer " + $response.id
```

Nicely done if you got this far, and that you could successfully get the bearer token. This is somewhat challenging, but means we are now authenticated with the vRealize server and can now perform some actually useful REST API requests using our bearer token! The full script is provided below for reference.

{% highlight powershell %}
$vra_server = "https://vra01.corp.local/"

$credentials=Get-Credential -Message "Please enter your vRealize credentials"

$tenant = "vsphere.local"

$data = @{
    username=$credentials.username
    password=$credentials.GetNetworkCredential().password
    tenant=$tenant
}
$data = $data | ConvertTo-Json

$uri = $vra_server + "identity/api/tokens"

$header = New-Object "System.Collections.Generic.Dictionary[[String],[String]]"
$header.Add("Accept", 'application/json')
$header.Add("Content-Type", 'application/json')

try {
    $response = Invoke-RestMethod -Method Post -Uri $uri -Headers $header -Body $data
} catch {
    Write-Host "StatusCode:" $_.Exception.Response.StatusCode.value__
    Write-Host "StatusDescription:" $_.Exception.Response.StatusDescription
    exit
}

$bearer_token = "Bearer " + $response.id
{% endhighlight %}

### Listing Catalog Items (Listing Available Blueprints)

Now that we have authenticated with the vRealize server, we can perform some useful tasks. To start, we will simply list the Blueprints - these are vRealize Blueprints that are available to the authenticated user! This is a very simple example, but will provide the basis on what can be achieved and guide future tasks that can be performed.

The `entitledCatalogItemViews` is the resource needed that is provided in the _Catalog Consumer REST API_. The `entitledCatalogItemViews` will provide a list of catalog items (blueprints) that are active, associated with a service, and that the user we have authenticated with had entitlements to _consume_. Basically, catalog items that we are entitled to view, and use.

The following example will continue adding to the script we started above. So you will notice that we will re-use some variables we have already defined. Start by updating the `$uri` to perform a request of `entitledCatalogItemViews`. 

{% highlight powershell %}
$uri = $vra_server + "catalog-service/api/consumer/entitledCatalogItemViews"
{% endhighlight %}

Next, we will need to add the bearer token to the already defined `$header` variable. We must define this additional header, or else we will get an unauthenticated error. We can simply add another dictionary entry with the key value of `Authentication`, and the value set to the contents of the `$bearer_token` variable.

{% highlight powershell %}
$header.Add("Authorization", $bearer_token)
{% endhighlight %}

Now, we will use the `Invoke-RestMethod` again. However, this time we will specify a `-Method Get` because we are _getting_ information from the vRealize server.

{% highlight powershell %}
$entitled_blueprints = Invoke-RestMethod -Method Get -Uri $uri -Headers $header
{% endhighlight %}

This is very similar to the previous `Invoke-RestMethod` that we used. This time we _get_ data from the `entitledCatalogItemViews` API with the specified headers - including the bearer token. We save the resultant output in the variable named `$entitled_blueprints`. The information we get back is exceptionally useful, and forms the basis of automated requesting of Blueprints in vRealize.

Finally, we will loop through the JSON object that was returned and simply print the name of the vRealize blueprints we have access to. This is easily achieved using the following loop. Note how we use `$entitled_blueprints.content`. This struture is an array of each Blueprint available.

{% highlight powershell %}
Write-Host ">>> Found the following vRealize Deployments..."
ForEach ($blueprint in $entitled_blueprints.content)
    {
        Write-Host "  >" $blueprint.name
    }
{% endhighlight %}

The script should print out something similar to the output below. I just made up the virtual machine names to provide an example.

```
>>> Found the following vRealize Deployments...
  > Ubuntu_WebServer
  > Ubuntu-Server-Docker
  > Windows-Server-2016
  > CentOS-BaseInstall
```

From here we could perform tasks like request a blueprint to be deployed. Very nice! To get an idea of the information available I have included a full JSON object for one vRealize deployment. As you can see the information is very detailed. Moreover, the information is highly useful when 

{% highlight json %}
{
    "@type":  "ConsumerEntitledCatalogItemView",
    "entitledOrganizations":  [
                                    "@{tenantRef=vsphere.local; tenantLabel=vsphere.local; subtenantRef=cb222bf4-7f3d-4a51-b94a-62fcfecece3b; subtenantLabel=WORK_BG}"
                                ],
    "catalogItemId":  "56588c8c-f593-4546-8854-b7f56c879771",
    "name":  "Linux-TrainingVM",
    "description":  "A Training VM for Linux.",
    "isNoteworthy":  false,
    "dateCreated":  "2018-07-12T19:36:50.981Z",
    "lastUpdatedDate":  "2018-07-12T23:17:09.098Z",
    "links":  [
                    "@{@type=link; rel=GET: Request Template; href=https://vra01.corp.local/catalog-service/api/consumer/entitledCatalogItems/5658ac8c-f593-4546-8854-b7f5d4879771/r
equests/template{?businessGroupId,requestedFor}}",
                    "@{@type=link; rel=POST: Submit Request; href=https://vra01.corp.local/catalog-service/api/consumer/entitledCatalogItems/5658ac8c-f593-4546-8854-b7f56ce39771/re
quests{?businessGroupId,requestedFor}}"
                ],
    "iconId":  "composition.blueprint.png",
    "catalogItemTypeRef":  {
                                "id":  "com.vmware.csp.component.cafe.composition.blueprint",
                                "label":  "Composite Blueprint"
                            },
    "serviceRef":  {
                        "id":  "f8e4c658-24d1-4af0-ab58-04e991b143ae",
                        "label":  "Linux"
                    },
    "outputResourceTypeRef":  {
                                    "id":  "composition.resource.type.deployment",
                                    "label":  "Deployment"
                                }
}
{% endhighlight %}

To give you some ideas of what you can do with this information here are some examples and discussion. You can select a specific Blueprint from the JSON array using the index number. For example, the Blueprint I wanted to view information about is indexed at `10`, so I can use the following code to print only the JSON object for that Blueprint:

{% highlight powershell %}
$entitled_blueprints.content[10]
{% endhighlight %}

After knowing the Blueprint index, you could determine the URL needed to request the template using the following code:

{% highlight powershell %}
$entitled_blueprints.content[10].links[1].href
{% endhighlight %}

There are two links provded, one for requesting a template (index `0`) and one for submitting a request (index `1`). I know, this is getting a little messy, but you would not usually be dynamically determining this information in a script... Rather you would query the REST API for the URL manually, then write a script to automate multiple Blueprint requests. 

The best method to learn how to use the information returned by the REST API is to dynamically program and test things in PowerShell. This is one of the great benefits of using PowerShell for this type of problem. Also, there is pretty good documentation provided on the vRealize server available at the following URL (make sure to change the domain name `vra01.corp.local` to the actual address of your vRealize server).

{% highlight powershell %}
https://vra01.corp.local/component-registry/services/docs
{% endhighlight %}

On this vRealize hosted site you can view the documentation for the vRealize REST API and all of the functions and features provided. 

## Conclusion

This post covered how to connect to a vRealize REST API using Windows PowerShell and print information about vRealize Blueprints. This was a revelation to myself and will definately make my life easier. Please leave a comment if you have any questions or feedback. Also, please let me know if this was useful, as I might continue this post with a series about common tasks that can be automated using the vRealize REST API... using PowerShell, of course!
