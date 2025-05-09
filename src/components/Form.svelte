<script>
	import { onMount } from 'svelte';
	import { passwordConfig, handleKeydown } from '@/consts.js';
	import FormChars from './formChars.svelte';
	import Output from './Output.svelte';

	let password = '';
	let {
		password_length,
		password_max_length,
		password_min_length,
		password_charset,
		password_strength_values
	} = passwordConfig;
	let password_strength = { width: '', color: '' };

	function createPassword(animated = true) {
		for (let i = 0; i < password_length; i++) {
			let random_charset = password_charset[Math.floor(Math.random() * password_charset.length)];
			setTimeout(
				() => {
					password =
						password.slice(0, i) +
						random_charset[Math.floor(Math.random() * random_charset.length)] +
						password.slice(i + 1);
				},
				animated ? i * 15 : 0
			);

			if (i === password_length - 1) password = password.slice(0, i);
		}
		password_strength =
			password_strength_values[
				Object.keys(password_strength_values).reduce((a, b) =>
					Math.abs(b - password_length) < Math.abs(a - password_length) ? b : a
				)
			];
	}

	function setLocalStorage() {
		localStorage.setItem('config', JSON.stringify({ password_length, password_charset }));
	}

	function handleClipboard() {
		navigator.clipboard.writeText(password);
		document.querySelector('#clipboardDialog').showModal();
		setTimeout(() => document.querySelector('#clipboardDialog').close(), 1100);
	}

	function handleRange(e) {
		password_length = Number(e.target.value);
		setLocalStorage();
		createPassword(false);
	}

	onMount(() => {
		document.addEventListener('keydown', (e) => handleKeydown(e, createPassword, handleClipboard));
		if (localStorage.getItem('config')) {
			let config = JSON.parse(localStorage.getItem('config'));
			password_length = config.password_length;
			password_charset = config.password_charset;
		} else setLocalStorage();
		createPassword();
	});
</script>

<form class="flex flex-col gap-2">
	<Output {password} {password_strength} {createPassword} />

	<span class="mb-3 block">Length: {password_length}</span>

	<fieldset class="flex gap-2 items-center">
		<button
			type="button"
			disabled={password_length <= 3}
			title="Subtract one"
			on:click={() => {
				password_length--;
				createPassword();
			}}
			class={`bg-white w-7 aspect-square border-none rounded-full hover:scale-105 relative grid place-items-center after:absolute after:w-3/5 after:h-[2px] after:bg-black after:rounded-full ${
				password_length <= 3 ? 'opacity-50 hover:scale-100' : ''
			}`}
		/>

		<input
			type="range"
			min={password_min_length}
			max={password_max_length}
			value={password_length}
			on:input={handleRange}
			class="input_range cursor-pointer h-[6px] my-3 mx-0 w-full rounded-full focus:outline-none appearance-none"
			style={`--left-slider: ${Math.round(
				((password_length - password_min_length) * 100) /
					(password_max_length - password_min_length)
			)}`}
		/>

		<button
			type="button"
			disabled={password_length >= password_max_length}
			title="Add one"
			on:click={() => {
				password_length++;
				createPassword();
			}}
			class={`bg-white w-7 aspect-square  border-none rounded-full hover:scale-105 relative grid place-items-center after:absolute after:w-3/5 after:h-[2px] before:absolute before:w-3/5 before:h-[2px] before:rotate-90 before:left-1/2 before:-translate-x-1/2 before:bg-black after:bg-black after:rounded-full before:rounded-full ${
				password_length >= password_max_length ? 'opacity-50 hover:scale-100' : ''
			}`}
		/>
	</fieldset>

	<button
		type="button"
		class="text-white p-2 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 font-bold uppercase my-3 sm:my-5 w-full hover:opacity-95 bg-[length:300%_100%] hover:bg-[100%_0] transition-all duration-300 active:scale-95"
		on:click={handleClipboard}
		style="box-shadow: 0 0 15px #6447ea7a">Copy</button
	>

	<FormChars {createPassword} {setLocalStorage} bind:password_charset />
</form>

<style>
	.password_container::after {
		width: var(--password_width);
		background: var(--password_color);
	}
	/* === Input range === */
	.input_range {
		background: rgba(128, 128, 128, 0.6) linear-gradient(white, white) no-repeat;
		background-size: calc(var(--left-slider) * 1%) 100%;
	}
	.input_range::-webkit-slider-thumb {
		height: 36px;
		width: 36px;
		border-radius: 100%;
		cursor: ew-resize;
		-webkit-appearance: none;
		margin-top: -1px;
		transition: transform 0.2s ease;
		background: white url('../assets/icon_unfold_more.svg') no-repeat center;
		background-size: 100%;
	}
	.input_range:hover::-webkit-slider-thumb {
		transform: scale(1.05);
	}
	:global(body.light-mode) .input_range::-webkit-slider-thumb {
		background: #e4e4fd url('../assets/icon_unfold_more.svg') no-repeat center;
		background-size: 100%;
	}
	:global(body.light-mode) .input_range {
		background: rgba(128, 128, 128, 0.6) linear-gradient(#c4c4fd, #c4c4fd) no-repeat;
		background-size: calc(var(--left-slider) * 1%) 100%;
	}
	:global(body.light-mode) output {
		background: linear-gradient(#e7e7ff, #d5d5ff);
	}
</style>
