import { App, GenericMessageEvent } from "@slack/bolt";
import config from "./config.json";

import SlackActionWrapper from "./slackActionWrapper";
import log4js, { getLogger } from "log4js";
import { InoutInvalid } from "./inoutInvalid";

export async function processBotRoutine(){
    const app: App = new App({
        token: config.botToken,
        appToken: config.appToken,

        socketMode: true
    });

    const slackAction = new SlackActionWrapper(app, config)
    await slackAction.postMessage("Initializing...")
    const inoutInvalid = new InoutInvalid(slackAction);

    app.event("message", async ({event, say}) =>{
        const messageEvent: GenericMessageEvent = event as GenericMessageEvent

        if (messageEvent.subtype!==undefined && messageEvent.subtype==="message_changed") return;

        await inoutInvalid.onReceivedMessage(messageEvent);
    });

    await app.start();

    log4js.getLogger().info("Bolt app is running up.");
    await slackAction.postMessage("finish setup")
}


