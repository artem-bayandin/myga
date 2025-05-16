const input1 = document.getElementById('num1');
const input2 = document.getElementById('num2');
const cbx = document.getElementById('cbx');
const don = document.getElementById('dn');

document.getElementById('run-vasya-run').addEventListener('click', async () => {
	let num1 = parseFloat(input1.value) || 0;
	if (num1 < 0) { num1 = 0 }
	let num2 = parseFloat(input2.value) || 0;
	if (num2 < 0) { num2 = 0 }
	const dis = cbx.checked;

	const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

	if (tab?.id) {
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

		dn.style.setProperty('display', 'block')

		setTimeout(() => {
			dn.style.setProperty('display', 'none')
		}, 1500)
	}
});
