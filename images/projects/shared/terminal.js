// Draws a terminal session for CLI tool thumbnails, so they can be generated
// in both themes instead of screenshotted. A template defines window.session
// before loading this script:
//
//   window.session = {
//     prompt: '$',
//     blocks: [
//       { command: 'tool list file', output: ['a', 'b'], highlight: 'b' },
//     ],
//   };
//
// highlight is optional and marks every match in that block's output, like
// grep --color. A command too long for one line can be split with \n, after a
// pipe for example; the lines after the first get bash's continuation prompt.
// An output line can also be { text, accent: true }, to draw it in the
// primary colour, for a banner say.
const escape = (text) => text
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;');

const highlightLine = (line, match) => {
  if (!match) return escape(line);
  return line
    .split(match)
    .map(escape)
    .join(`<span class="match">${escape(match)}</span>`);
};

const continuation = '>';

const commandLine = (shown, command) =>
  `<span class="prompt">${escape(shown)}</span> <span class="command">${escape(command)}</span>`;

const { prompt, blocks } = window.session;
const lines = [];
for (const block of blocks) {
  const [first, ...rest] = block.command.split('\n');
  lines.push(commandLine(prompt, first));
  for (const line of rest) {
    lines.push(commandLine(continuation, line));
  }
  for (const line of block.output ?? []) {
    const { text, accent } = typeof line === 'string' ? { text: line } : line;
    const className = accent ? 'output accent' : 'output';
    lines.push(`<span class="${className}">${highlightLine(text, block.highlight)}</span>`);
  }
}
// End on an idle prompt, as a terminal would
lines.push(`<span class="prompt">${escape(prompt)}</span> <span class="cursor"> </span>`);

const terminal = document.createElement('pre');
terminal.className = 'terminal';
terminal.innerHTML = lines.join('\n');
document.body.appendChild(terminal);

document.fonts.ready.then(() => {
  document.body.dataset.ready = '';
});
