const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionFlagsBits, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('over')
        .setDescription('Purges messages from today between specified start and end times, excluding the first 2 messages.')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.MuteMembers)
        .addStringOption(option =>
            option.setName('start-time')
                .setDescription('Start time in HH:MM format')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('end-time')
                .setDescription('End time in HH:MM format')
                .setRequired(true)),
    async execute(interaction) {
        const startTime = interaction.options.getString('start-time');
        const endTime = interaction.options.getString('end-time');

        const now = new Date();
        const start = new Date(now);
        const [startHours, startMinutes] = startTime.split(':').map(Number);
        start.setHours(startHours, startMinutes, 0, 0);

        const end = new Date(now);
        const [endHours, endMinutes] = endTime.split(':').map(Number);
        end.setHours(endHours, endMinutes, 0, 0);

        if (start > end) {
            end.setDate(end.getDate() + 1); 
        }

        try {
            const messages = await interaction.channel.messages.fetch({ limit: 100 });

            const sortedMessages = messages.sort((a, b) => a.createdTimestamp - b.createdTimestamp);

            const messagesToDelete = sortedMessages.filter((msg, index) => {
                const msgDate = new Date(msg.createdTimestamp);
                return index >= 2 && msgDate >= start && msgDate <= end;
            });

            for (const msg of messagesToDelete.values()) {
                await msg.delete();
            }

            const embed = new EmbedBuilder()
                .setTitle('Session Over')
                .setDescription(`Thanks to <@${interaction.user.id}> for hosting that wonderful session. We hope we can see you members in our next sessions.
                    
                    A 15-minute Cooldown has been permitted for this session. If other people request a session, please give them a mark.
                    
                    **__Session Information__**
                     Start Time:${startTime}
                     End Time:${endTime}`)
                     .setColor(0x2B2D31)
                     .setImage('https://cdn.discordapp.com/attachments/1256655891424346202/1271156189824155770/pixelcut-export_17.png?ex=66b64ff4&is=66b4fe74&hm=d917c4eebecd17c66608010450f3440dbbf654d64a5ed069015e38efb9892d93&')
                     .setFooter({
                         text: 'Southwest Florida Roleplay Adventures',
                         iconURL: 'https://cdn.discordapp.com/attachments/1212943927737589780/1271110625753563146/pixelcut-export-modified.png?ex=66b62585&is=66b4d405&hm=961b245cf5b91f61f75924db9516eecc1df0490f5edb5048689d228d8b9d6fbc&'
                     });

                const newEmbed = new EmbedBuilder()
                .setTitle("Session Over")
                .setDescription(`<@${interaction.user.id}> has ended their session in `)
                .setColor(0x2B2D31)
                .setImage('https://cdn.discordapp.com/attachments/1256655891424346202/1271130389364080751/pixelcut-export_9.png?ex=66b637ed&is=66b4e66d&hm=afa8b93e3b13502bbe837a9e6c70ec0640b89ba99b7e0e1dfab9e92e995448d1&')
                .setFooter({
                    text: 'Southwest Florida Roleplay Adventures',
                    iconURL: 'https://cdn.discordapp.com/attachments/1212943927737589780/1271110625753563146/pixelcut-export-modified.png?ex=66b62585&is=66b4d405&hm=961b245cf5b91f61f75924db9516eecc1df0490f5edb5048689d228d8b9d6fbc&'
                });
    
            const targetChannel = await interaction.client.channels.fetch(`1271089061112713310`);
            await targetChannel.send({ embeds: [newEmbed] });

            await interaction.channel.send({ embeds: [embed] });

            await interaction.reply({ content: 'Command sent below.', ephemeral: true });
        } catch (error) {
            console.error('Error deleting messages:', error);
            await interaction.reply({ content: 'Failed to delete messages. Please try again later.', ephemeral: true });
        }
    },
};
