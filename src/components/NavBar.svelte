<script>
	import DarkToggle from '@/components/DarkToggle.svelte';
	import GitHubIcon from '@/assets/icons/github.svg';
</script>

<header class="absolute top-5 right-5">
	<nav>
		<ul class="flex flex-col gap-4">
			<li>
				<DarkToggle />
			</li>
			<li>
				<a
					class="hover:scale-105 block transition-transform active:scale-95"
					href="https://github.com/cosmoart/Passwordss"
					title="Github repo"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img src={GitHubIcon} alt="GitHub Icon" class="size-[26px]" />
				</a>
			</li>
		</ul>
	</nav>
</header>
