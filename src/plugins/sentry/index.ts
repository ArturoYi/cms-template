import * as Sentry from "@sentry/vue";
import { BrowserTracing } from "@sentry/tracing";
import type { App } from "vue";
// import Logger from "@/utils/console/index";
import router from "@/router";

export function sentryInit(app: App) {
	Sentry.init({
		app,
		dsn: "https://8526c67167814783b6ee1aa43566a6ce@o4504336361848832.ingest.sentry.io/4504336364142592",
		// environment: "production", //環境變量
		integrations: [
			new BrowserTracing({
				routingInstrumentation: Sentry.vueRouterInstrumentation(router),
				tracePropagationTargets: ["localhost", "my-site-url.com", /^\//]
			})
		],
		// Set tracesSampleRate to 1.0 to capture 100%
		// of transactions for performance monitoring.
		// We recommend adjusting this value in production
		tracesSampleRate: 1.0
	});

	// You can do the same thing using `addGlobalEventProcessor`
	// Sentry.addGlobalEventProcessor(function (event, hint) {
	// 	// Add anything to the event here
	// 	// returning `null` will drop the event
	// 	Logger.error({ event, hint }, "sentry捕獲");
	// 	return event;
	// });
}
