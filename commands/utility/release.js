const { SlashCommandBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle, ComponentType, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('release')
        .setDescription('Releases the session for everyone to join.')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.MuteMembers)
        .addStringOption(option =>
            option.setName('session-link')
                .setDescription('Link for the session so that civilians may join.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('peacetime-status')
                .setDescription('Current peacetime status.')
                .addChoices(
                    { name: 'Peacetime On', value: 'On' },
                    { name: 'Peacetime Normal', value: 'Normal' },
                    { name: 'Peacetime Off', value: 'Off' }
                )
                .setRequired(true))
        .addStringOption(option =>
            option.setName('frp-speed')
                .setDescription('FRP speeds.')
                .addChoices(
                    { name: '75', value: '75' },
                    { name: '80', value: '80' },
                    { name: '85 (should not be used frequently)', value: '85' }
                )
                .setRequired(true))
        .addStringOption(option =>
            option.setName('drifting-status')
                .setDescription('Current drifting status.')
                .addChoices(
                    { name: 'On', value: 'On' },
                    { name: 'Corners Only', value: 'Corners Only' },
                    { name: 'Off', value: 'Off' }
                )
                .setRequired(true)),
    async execute(interaction) {
        try {
            const sessionLink = interaction.options.getString('session-link');
            const peacetimeStatus = interaction.options.getString('peacetime-status');
            const frpSpeed = interaction.options.getString('frp-speed');
            const driftingStatus = interaction.options.getString('drifting-status');

            const embed = new EmbedBuilder()
                .setTitle('Session Release')
                .setDescription(`<@${interaction.user.id}> has released their session. Please follow the instructions listed below. Failing to follow the information may result in a server strike.
                    
                    **__Session Information__**
> If you need to make a report or anything please head to the <#1271080951669329982> Channel.

> Leaking the link to people that's currently not in the server will receive an Unappealable Ban!`)
                .setColor(0x2B2D31)
                .setImage('https://cdn.discordapp.com/attachments/1256655891424346202/1271153064983789673/pixelcut-export_16.png?ex=66b64d0b&is=66b4fb8b&hm=76407ebff663bcc94afe2ed4db8c6b8c4cf8a383e94fbbe51e9ecd8e6a5c63f0&')
                .setFooter({
                    text: 'Southwest Florida Roleplay Adventures',
                    iconURL: 'https://cdn.discordapp.com/attachments/1212943927737589780/1271110625753563146/pixelcut-export-modified.png'
                });

            const sessionButton = new ButtonBuilder()
                .setLabel('Session Link')
                .setStyle(ButtonStyle.Primary)
                .setCustomId('ls');

            const roleplayButton = new ButtonBuilder()
                .setLabel('Roleplay Information')
                .setStyle(ButtonStyle.Primary)
                .setCustomId('roleplay-info');

            const row = new ActionRowBuilder()
                .addComponents(sessionButton, roleplayButton);

            const newEmbed = new EmbedBuilder()
                .setTitle("Session Release")
                .setDescription(`<@${interaction.user.id}> has released their session in <#1271090691380088916>`)
                .setColor(0x2B2D31)
                .setFooter({
                    text: 'Southwest Florida Roleplay Adventures',
                    iconURL: 'https://cdn.discordapp.com/attachments/1212943927737589780/1271110625753563146/pixelcut-export-modified.png'
                });

            const logChannel = await interaction.client.channels.fetch('1271089061112713310');
            if (!logChannel) {
                console.error('Log channel not found or bot does not have access.');
                await interaction.reply({ content: 'Log channel not found or bot does not have access.', ephemeral: true });
                return;
            }

            await logChannel.send({ embeds: [newEmbed] });
            await interaction.channel.send({ content: '@here, <@&1271091450326814877>', embeds: [embed], components: [row] });
            await interaction.reply({ content: 'You have successfully released the session.', ephemeral: true });

            const filter = i => i.customId === 'ls' || i.customId === 'roleplay-info';
            const collector = interaction.channel.createMessageComponentCollector({ filter, componentType: ComponentType.Button, time: 9999999 });

            collector.on('collect', async i => {
                try {
                    await i.deferUpdate();

                    let responseEmbed;

                    if (i.customId === 'ls') {
                        await i.followUp({ content: `**Link:** ${sessionLink}`, ephemeral: true });
                    } else if (i.customId === 'roleplay-info') {
                        responseEmbed = new EmbedBuilder()
                            .setTitle('Roleplay Information')
                            .setDescription(`
                                **Host:** <@${interaction.user.id}>
                                **Peacetime Status:** ${peacetimeStatus}
                                **FRP Speed:** ${frpSpeed}
                                **Drifting Status:** ${driftingStatus}
                            `)
                            .setColor(0x2B2D31)
                            .setFooter({
                                text: 'Southwest Florida Roleplay Adventures',
                                iconURL: 'https://cdn.discordapp.com/attachments/1212943927737589780/1271110625753563146/pixelcut-export-modified.png'
                            });
                    }

                    if (responseEmbed) {
                        await i.followUp({ embeds: [responseEmbed], ephemeral: true });
                    }

                    const logEmbed = new EmbedBuilder()
                        .setTitle(i.customId === 'ls' ? `Session Link Button` : `Roleplay Information Button`)
                        .setDescription(`Button clicked by <@${i.user.id}> in <#1271090691380088916>`)
                        .setColor(0x2B2D31)
                        .setFooter({
                            text: 'Southwest Florida Roleplay Adventures',
                            iconURL: 'https://cdn.discordapp.com/attachments/1212943927737589780/1271110625753563146/pixelcut-export-modified.png'
                        });

                    await logChannel.send({ embeds: [logEmbed] });
                } catch (error) {
                    console.error('Error responding to interaction:', error);
                }
            });

            collector.on('end', collected => {
                console.log(`Collected ${collected.size} interactions.`);
            });
        } catch (error) {
            console.error('Error executing command:', error);
            await interaction.reply({ content: 'There was an error while executing this command.', ephemeral: true });
        }
    },
};
