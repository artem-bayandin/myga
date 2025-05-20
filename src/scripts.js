const input1 = document.getElementById('num1');
const input2 = document.getElementById('num2');
const cbx = document.getElementById('cbx');
const don = document.getElementById('dn');

function red(msg) {
	lbl(msg, 'red')
}

function green(msg) {
	lbl(msg, 'green')
}

function lbl(msg, color) {
	dn.innerText = msg
	dn.style.setProperty('background-color',color)
	dn.style.setProperty('display', 'block')
	setTimeout(() => {
		dn.style.setProperty('display', 'none')
	}, 1500)
}

const lvn1 = +localStorage.getItem('myga::num1')
const lvn2 = +localStorage.getItem('myga::num2')
const lvc1 = +localStorage.getItem('myga::cbx')
if (lvn1 && lvn1 > 0) {input1.value = lvn1;}
if (lvn2 && lvn2 > 0) {input2.value = lvn2;}
if (lvc1) {cbx.checked = true;}

document.getElementById('run-vasya-run').addEventListener('click', async () => {
	let num1 = parseFloat(input1.value) || 0;
	if (num1 < 0) { num1 = 0 }
	let num2 = parseFloat(input2.value) || 0;
	if (num2 < 0) { num2 = 0 }
	const dis = cbx.checked;

	const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

	if (tab?.id && new URL(tab.url).host.endsWith('youtube.com')) {
		chrome.scripting.executeScript({
			target: { tabId: tab.id },
			func: (n1, n2, inlined) => {
				const applyStyle = () => {
					// horizontal
					if (n1) {
						document.querySelectorAll('div#contents.style-scope.ytd-rich-grid-renderer .style-scope.ytd-rich-grid-renderer')
							.forEach(el => {
								el.style.setProperty('--ytd-rich-grid-items-per-row', n1);
							});
					}

					if (n2) {
						// vertical
						document.querySelectorAll('div#contents.style-scope.ytd-rich-shelf-renderer .style-scope.ytd-rich-shelf-renderer')
							.forEach(el => {
								el.style.setProperty('--ytd-rich-grid-slim-items-per-row', n2);
								el.style.setProperty('display', 'block !important');
								el.removeAttribute('hidden');
							});
					}

					if (inlined) {
						// inline stories
						document.querySelectorAll('div#contents.style-scope.ytd-rich-shelf-renderer')
							.forEach(el => {
								el.style.setProperty('display', 'flex');
								el.style.setProperty('flex-wrap', 'nowrap');
								el.style.setProperty('overflow', 'hidden');
								el.style.setProperty('white-space', 'nowrap');
							});
					}
				};

				// Apply initially
				applyStyle();

				// Get all matching "contents" containers (because IDs are duplicated)
				const targetNodes = document.querySelectorAll('div#contents');

				if (targetNodes.length > 0) {
					targetNodes.forEach(targetNode => {
						const observer = new MutationObserver(() => {
							applyStyle();
						});

						observer.observe(targetNode, { childList: true, subtree: true });
					});
				}
			},
			args: [num1, num2, dis],
		});
		if (num1 && num1 > 0) {localStorage.setItem('myga::num1', num1);}
		if (num2 && num2 > 0) {localStorage.setItem('myga::num2', num2);}
		{localStorage.setItem('myga::cbx', dis ? '1' : '');}
		green('done')
	} else {
		red('not a YT page')
	}
});
