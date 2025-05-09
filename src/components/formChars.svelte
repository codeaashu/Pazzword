<script>
	import { charsetConfig } from '@/consts.js';
	export let createPassword, setLocalStorage, password_charset;

	function handleColorChange(query, type = 'add') {
		document.querySelectorAll(query).forEach((item) => item.classList[type]('char-hover'));
	}

	function handleCheck(e) {
		if (e.target.checked) password_charset.push(e.target.value);
		else {
			password_charset = password_charset.filter((item) => item !== e.target.value);
		}

		if (password_charset.length === 1) {
			document.querySelector(`.charset_checkbox[value="${password_charset[0]}"]`).disabled = true;
		} else {
			document.querySelectorAll('.charset_checkbox').forEach((item) => (item.disabled = false));
		}

		setLocalStorage();
		createPassword();
	}
</script>

<div>
	<fieldset
		class="flex gap-2 text-lg flex-col sm:flex-row justify-between mt-2 transition-all w-full"
	>
		<legend class="contents">Characters used:</legend>
		<div class="flex gap-5 justify-between">
			{#each Object.entries(charsetConfig.INPUTS_CHARSET) as [Title, Value], i}
				<label
					class="cursor-pointer"
					title={Title}
					on:mouseover={() => handleColorChange(`.charset_${i + 1}`)}
					on:mouseout={() => handleColorChange(`.charset_${i + 1}`, 'remove')}
					on:focus={() => handleColorChange(`.charset_${i + 1}`)}
					on:blur={() => handleColorChange(`.charset_${i + 1}`, 'remove')}
				>
					<input
						type="checkbox"
						value={Value[1]}
						on:change={handleCheck}
						checked={password_charset.includes(Value[1])}
						class="charset_checkbox appearance-none relative size-6 mr-1 dark:bg-white border-none cursor-pointer outline-none before:w-full before:h-full before:absolute before:scale-0 checked:before:scale-100 transition-all duration-[150] hover:bg-gray-300 checked:!bg-purple-600 hover:checked:!bg-purple-500 "
					/>
					{Value[0]}
				</label>
			{/each}
		</div>
	</fieldset>
</div>

<style>
	.switchMode:hover label {
		width: var(--maxWidth);
	}
	:disabled {
		filter: grayscale(100%);
		cursor: not-allowed !important;
	}
	.charset_checkbox::before {
		background: url('../assets/icon_check.svg') no-repeat center center;
		background-size: 100%;
		transition: transform 0.05s ease-out;
	}
	:global(body.light-mode) .charset_checkbox {
		background-color: rgb(148 163 184);
	}
</style>
