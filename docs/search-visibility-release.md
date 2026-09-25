# Search visibility release, 25 September 2026

This PR aligns homepage and article canonicals, structured-data URLs and sitemap URLs with the live www.pithonix.ai host. It preserves the Google verification meta token and does not change the existing verification file.

The homepage now includes a visible static enterprise/GCC briefing outside the React mount root. This content is delivered to every visitor, including browsers with JavaScript disabled. The interactive application is unchanged. This is not full application prerendering.

The new static summit guide links to official GCC E² delegate applications and sponsorship enquiries, with referral UTMs. State Bank Of India is Title Sponsor; Pithonix AI is Titanium Sponsor, not host. No attendee numbers, speaker names or sponsor prices were added.

Removed FAQ structured data without a matching visible FAQ and an unsupported SearchAction that pointed to a blog listing rather than a site search.

Validation: parsed JSON-LD in all edited HTML files; checked unique www canonicals, XML sitemap, retained verification token, visible static content and sponsor order. No application source, dependency, API or build configuration changes. Full Vite build and production hosting verification remain required before merging this PR.

Deployment is intentionally pending: the Vercel connection returned no accessible teams, so this repository's relationship to the production domain could not be verified. Do not create a new hosting project. Use the existing production project to verify the Git repository, preview the build, then merge/deploy.

After release, use the owner's existing Google Search Console property, submit https://www.pithonix.ai/sitemap.xml and inspect the homepage and new article. Existing verification tokens alone do not prove current Search Console access. Track search impressions/clicks and referral applications/verified paid passes separately.

This improves accessibility to search engines and answer engines. It does not guarantee rankings or AI citations. Existing product claims and article statistics need periodic owner review; this release does not independently substantiate them.
