import adapter from '@sveltejs/adapter-static';


export default {
  kit: {
    adapter: adapter({
      pages: 'docs',    // Output → /docs
      assets: 'docs',
      fallback: null
    }),
    paths: {
      base: '/Repos_ws' // Ändra till ditt repo-namn om det inte är root-sida
    }
  }
};



			
			