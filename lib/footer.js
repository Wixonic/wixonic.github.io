import loader from "/lib/loader.js";
import { path } from "/lib/path.js";
import { RichLink } from "/lib/rich.js";

const links = [
	{
		text: "Homepage",
		url: localEnvironment ? path.local.root : path.root
	}, {
		text: "Newsroom",
		url: new URL("/news", localEnvironment ? path.local.root : path.root)
	}, {
		text: "WixiLand",
		url: localEnvironment ? path.local.wixiLand : path.wixiLand
	}, {
		text: "Accounts",
		url: localEnvironment ? path.local.accounts : path.accounts
	}, {
		text: "Admin",
		url: localEnvironment ? path.local.admin : path.admin
	}
];

const quickLinks = [
	{
		alt: "Discord",
		icon: new URL("/icon/discord-white.svg", localEnvironment ? path.local.assets : path.assets),
		url: new URL("/discord", localEnvironment ? path.local.redirects : path.redirects)
	}, {
		alt: "YouTube",
		icon: new URL("/icon/youtube-white.svg", localEnvironment ? path.local.assets : path.assets),
		url: new URL("/youtube", localEnvironment ? path.local.redirects : path.redirects)
	}, {
		alt: "GitHub",
		icon: new URL("/icon/github-white.svg", localEnvironment ? path.local.assets : path.assets),
		url: new URL("/github", localEnvironment ? path.local.redirects : path.redirects)
	}, {
		alt: "Instagram",
		icon: new URL("/icon/instagram-white.svg", localEnvironment ? path.local.assets : path.assets),
		url: new URL("/instagram", localEnvironment ? path.local.redirects : path.redirects)
	}, {
		alt: "Twitch",
		icon: new URL("/icon/twitch-white.svg", localEnvironment ? path.local.assets : path.assets),
		url: new URL("/twitch", localEnvironment ? path.local.redirects : path.redirects)
	}
];

const init = async () => {
	const footer = document.createElement("footer");
	footer.classList.add("fade");
	document.body.append(footer);

	const linksEl = document.createElement("div");
	linksEl.classList.add("links");
	footer.append(linksEl);

	for (const link of links) {
		const el = await RichLink(link.url);
		el.classList.add("link", "fade");
		el.innerHTML = `<div class="text">${link.text}</div>`;
		linksEl.append(el);
	}

	const quickLinksEl = document.createElement("div");
	quickLinksEl.classList.add("quickLinks");
	footer.append(quickLinksEl);

	for (const link of quickLinks) {
		const el = RichLink(link.url);
		el.classList.add("link", "fade");
		el.target = "_blank";

		const img = await loader.image(link.icon);
		img.alt = link.alt;
		el.append(img);

		quickLinksEl.append(el);
	}

	const legalEl = document.createElement("div");
	legalEl.classList.add("legal", "fade");
	footer.append(legalEl);

	const copyright = document.createElement("div");
	copyright.innerHTML = `Copyright © Wixonic 2021-${new Date().getFullYear()}. All rights reserved.`;
	copyright.classList.add("fade");
	legalEl.append(copyright);

	const legalLinks = document.createElement("div");
	legalLinks.classList.add("fade");

	const privacyPolicy = RichLink(new URL("/privacy/", localEnvironment ? path.local.root : path.root));
	privacyPolicy.classList.add("fade");
	privacyPolicy.innerHTML = "Privacy Policy";
	legalLinks.append(privacyPolicy);

	legalLinks.append(" | ");

	const contact = RichLink(new URL("/contact/", localEnvironment ? path.local.root : path.root));
	contact.classList.add("fade");
	contact.innerHTML = "Contact us";
	legalLinks.append(contact);

	legalEl.append(legalLinks);
};

export default {
	init
};