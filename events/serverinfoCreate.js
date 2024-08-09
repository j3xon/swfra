const { Events, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (interaction.isStringSelectMenu()) {
            if (interaction.customId === 'information_select') {
                let embedResponses = [];
                let components = [];

                switch (interaction.values[0]) {
                    case 'sinfo':
                        const serverRules = [
                            "**1.** **__Treat Everyone with Respect:__**\n\n Be kind and respectful to all members. Harassment, discrimination, hate speech, and bullying are strictly prohibited.",
                            "**2.** **__No Spamming:__**\n\n Avoid spamming in any form, including excessive messages, emojis, or links. Keep the chat organized and easy to read.",
                            "**3.** **__Post in the Right Channels:__**\n\n Use the appropriate channels for your posts. Off-topic discussions belong in the off-topic channel.",
                            "**4.** **__No NSFW Content:__**\n\n Explicit content, such as images, videos, and links, is forbidden. Maintain a safe environment for all ages.",
                            "**5.** **__No Advertising:__**\n\n Self-promotion or advertising other servers, products, or services is not allowed without moderator approval.",
                            "**6.** **__Keep Conversations Civil:__**\n\n Avoid heated arguments or discussions on divisive topics like politics and religion.",
                            "**7.** **__Follow Discord's Terms of Service:__**\n\n Always adhere to Discord's Community Guidelines and Terms of Service.",
                            "**8.** **__Use English Only:__**\n\n To ensure clear communication, please use English in public channels unless stated otherwise.",
                            "**9.** **__No Impersonation:__**\n\n Do not impersonate other members, moderators, or public figures.",
                            "**10.** **__Protect Privacy:__**\n\n Respect privacy by not sharing your personal information or that of others."
                        ];
                
                        embedResponses = serverRules.map((rule, index) => new EmbedBuilder()
                            .setDescription(rule)
                            .setColor(0x2B2D31)
                        );
                        break;

                    case 'sguild':
                        const serverGuidelines = [
                                "**Rule 1**\nTo remain in this server, you MUST BE 13 years or older. If it is discovered that you are under 13, you will be banned from SWFRA.",
                                "**Rule 2**\nPlease maintain respect towards all members within the SWFRA server. Any disrespectful behavior will be met with a warning and subsequent mute. Additionally, it is important to heed the instructions of our staff at all times. Failure to comply and engaging in arguments may result in a 5-hour mute from the server.",
                                "**Rule 3**\nSwearing is allowed, but keep it to a minimum. Excessive swearing is prohibited. If you're caught swearing excessively, you'll be warned and muted.",
                                "**Rule 4**\nRacial slurs are strictly prohibited. If you are found using them, you will be banned.",
                                "**Rule 5**\nThe sharing of NSFW content is strictly prohibited within the SWFRA. Any instances of NSFW content being shared across the server will result in a ban from SWFRA.",
                                "**Rule 6**\nPlease refrain from participating in or encouraging any form of drama in the channels or voice chats of SWFRA. Violations of this policy will result in an immediate mute. Additionally, engaging in activities such as doxxing or IP grabbing will result in a ban from SWFRA.",
                                "**Rule 7**\nExcessive pinging of roles or users is strictly prohibited. The maximum allowable pings per message is 2. Violation of this rule will result in a mute.",
                                "**Rule 8**\nUnauthorized usage or duplication of SWFRA assets is strictly prohibited. Any violation of this policy will result in a ban from SWFRA."
                            ];
                        
                        embedResponses = serverGuidelines.map((guideline, index) => new EmbedBuilder()
                            .setDescription(guideline)
                            .setColor(0x2B2D31)
                            );
                        break;

                    case 'sping':
                        const embedResponse = new EmbedBuilder()
                            .setTitle('Session Ping')
                            .setDescription('Press the button below to receive the <@&1271091450326814877> role. The "Session Ping" role will notify you whenever a session starts or occurs.')
                            .setColor(0x2B2D31);

                        const button = new ButtonBuilder()
                            .setCustomId('toggle_ping')
                            .setLabel('Session Ping')
                            .setStyle(ButtonStyle.Secondary);

                        const row = new ActionRowBuilder().addComponents(button);
                        components.push(row);
                        embedResponses.push(embedResponse);
                        break;

                    case 'afl':
                        const affiliateLinksEmbed = new EmbedBuilder()
                            .setTitle('Affiliate Links')
                            .setDescription('Comming Soon')
                            .setColor(0x2B2D31);
                        
                        embedResponses.push(affiliateLinksEmbed);
                        break;
                }

                await interaction.reply({ embeds: embedResponses, components, ephemeral: true });
            }
        } else if (interaction.isButton()) {
            const roleId1 = '1271091450326814877';
            const member = interaction.member;

            if (interaction.customId === 'toggle_ping' || interaction.customId === 'sping') {
                if (member.roles.cache.has(roleId1)) {
                    await member.roles.remove(roleId1);
                    await interaction.reply({ content: 'The <@&1271091450326814877> role has been removed from you.', ephemeral: true });
                } else {
                    await member.roles.add(roleId1);
                    await interaction.reply({ content: 'You have been granted the <@&1271091450326814877> role.', ephemeral: true });
                }
            }

        }
    },
};
