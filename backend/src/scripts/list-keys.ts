
import {
    IPublishableApiKeyModuleService,
} from "@medusajs/framework/types"
import {
    Modules,
} from "@medusajs/framework/utils"

export default async function listChannels({ container }) {
    const salesChannelService = container.resolve("salesChannelModuleService")

    const [channels] = await salesChannelService.listAndCount()

    console.log("Sales Channels:")
    channels.forEach(channel => {
        console.log(`- ID: ${channel.id}, Name: ${channel.name}, Description: ${channel.description}`)
    })
}
