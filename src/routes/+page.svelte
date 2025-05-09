<script>
	import Form from '@/components/Form.svelte';
	import { onMount } from 'svelte';
	import NavBar from '@/components/NavBar.svelte';

	onMount(() => {
		document.body.style.setProperty('--cursorY', '0.5');
		document.body.style.setProperty('--cursorX', '0.5');
		document.addEventListener('mousemove', (e) => {
			let x = e.clientX / window.innerWidth;
			let y = e.clientY / window.innerHeight;
			if (x < 0.55 && x > 0.45) {
				document.body.style.setProperty('--cursorX', x);
			}
			if (y < 0.55 && y > 0.45) {
				document.body.style.setProperty('--cursorY', y);
			}
		});
	});
</script>

<svelte:head>
	<title>PAZZWORD</title>
	<!-- {/* Meta */} -->
	<meta name="author" content="Ashutosh Singh - codeaashu" />
	<meta name="theme-color" content="#5a4ceb" />
	<meta
		name="description"
		content="Strong Password Generator – Create strong, random combinations to protect your online accounts. Keep your data safe with just one click!"
	/>
	<meta name="robots" content="index, nofollow" />

	<!-- {/* Open Graph */} -->
	<meta property="og:title" content="Pazzword" />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="https://pazzword.vercel.app/preview.jpg" />
	<meta property="og:url" content="https://pazzword.vercel.app" />
	<meta
		property="og:description"
		content="Strong Password Generator – Create strong, random combinations to protect your online accounts. Keep your data safe with just one click!"
	/>

	<!-- {/* Twitter */} -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@Cosmoart" />
	<meta name="twitter:creator" content="@Cosmoart" />
	<meta name="twitter:title" content="pazzword" />
	<meta
		name="twitter:description"
		content="Strong Password Generator – Create strong, random combinations to protect your online accounts. Keep your data safe with just one click!"
	/>
	<meta name="twitter:image" content="https://pazzword.vercel.app/preview.jpg" />
</svelte:head>

<div class="box">
	<main
		class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#2A2B38] bg-opacity-75 sm:p-10 py-8 px-5 w-11/12 max-w-[35rem] text-white after:w-4/5 after:h-80 after:-top-40 after:absolute after:-z-10 transition-all"
		style="box-shadow: 0 0 40px #6447ea14;"
	>
		<h1 class="uppercase font-bold mb-6 text-xl sm:text-2xl ">P4SSW0RD G3NER4T0R</h1>
		<Form />
	</main>
</div>
<dialog
	id="clipboardDialog"
	class="transition-all px-8 py-4 text-[17px] bg-[#2A2B38] text-white font-bold block -top-5 bottom-auto opacity-0 open:top-2 open:opacity-100 backdrop:bg-transparent"
>
	<p class="font-medium tracking-wide text-base">Copied to clipboard!</p>
</dialog>
<NavBar />
