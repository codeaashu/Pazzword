<script>
	import icon_arrow_clockwise from '@/assets/icon_arrow_clockwise.svg';
	import { charsetConfig } from '@/consts.js';

	export let password_strength, password, createPassword;
</script>

<div
	class="password_container relative after:absolute after:h-[4px] after:transition-all"
	style={`--password_width: ${password_strength.width}; --password_color: ${password_strength.color}`}
>
	<output
		class="bg-white block resize-none text-black w-full h-11 p-2 pl-3 pr-6 text-[15px] leading-[25px] truncate"
	>
		{#each password as char}
			<span
				class="transition-colors sm:text-lg font-medium charset_{[
					charsetConfig.CHARSET_UPERRCASE,
					charsetConfig.CHARSET_LOWERCASE,
					charsetConfig.CHARSET_NUMBER,
					charsetConfig.CHARSET_SPECIAL
				].findIndex((item) => item.includes(char)) + 1}">{char}</span
			>
		{/each}
	</output>
	<button
		type="button"
		title="Other Password"
		on:click={createPassword}
		class="bg-white p-[10px] font-bold uppercase scale-90 absolute top-1/2 -translate-y-1/2 right-0 active:-rotate-180 hover:opacity-75 transition-all rounded-full"
	>
		<img src={icon_arrow_clockwise} alt="" class="w-6" />
	</button>
</div>
