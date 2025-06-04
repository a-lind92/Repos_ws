<script>
	import '../app.postcss';

	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';

	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<nav>
	<a href="/" data-sveltekit-reload rel="noopener noreferrer">HEM</a>
  </nav>
  
  <nav>
	<a href="/photoapp" data-sveltekit-reload>PHOTOAPP</a>
  </nav>
  
  <nav>
	<a href="/register" data-sveltekit-reload rel="noopener noreferrer">REGISTERRRR</a>
  </nav>
  
  <nav>
	<a href="/login" data-sveltekit-reload rel="noopener noreferrer">LOGIN</a>
  </nav>
  
  <nav>
	<a href="/habit-tracker" data-sveltekit-reload rel="noopener noreferrer">HABIT TRACKER</a>
  </nav>
  
<style>
	:global(body), :global(html){
  margin: 0%;
  padding: 0%;
  height: 100vh;
  width: 100vw;
}

</style>

<slot />
