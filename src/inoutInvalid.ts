import { GenericMessageEvent } from "@slack/bolt";
import { getLogger } from "log4js";
import SlackActionWrapper from "./slackActionWrapper";



export class InoutInvalid{
    public constructor(private readonly slackAction: SlackActionWrapper){}

    public async onReceivedMessage(e: GenericMessageEvent){
        if (e.subtype!=="channel_leave" && 
            e.subtype!=="channel_join") return;

        getLogger().log("delete message");
        getLogger().info(e);

        await this.slackAction.deleteMessage(e.channel, e.ts);
    }
}






