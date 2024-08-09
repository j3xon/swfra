const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, Events } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('startup-message')
        .setDescription('Gives Startup msg'),
    async execute(interaction) {
        const image = "https://cdn.discordapp.com/attachments/1256655891424346202/1271151935713579019/pixelcut-export_13.png?ex=66b6f4be&is=66b5a33e&hm=6f40838c82b4829b5dfbd5b37f81b7cbbb073dd203aba88cc79f8d290b31c5c2&";

        const embed1 = new EmbedBuilder()
            .setTitle('SWFRA | Server Startup')
            .setDescription("> This is the designated area for hosting and conducting sessions. Before you participate, please familiarize yourself with the startup guidelines outlined below. It's crucial to review these rules prior to joining any sessions. Additionally, consult the Banned Vehicle List before selecting a car to drive.")
            .setThumbnail('https://cdn.discordapp.com/attachments/1212943927737589780/1271110625753563146/pixelcut-export-modified.png?ex=66b62585&is=66b4d405&hm=961b245cf5b91f61f75924db9516eecc1df0490f5edb5048689d228d8b9d6fbc&')
            .setColor(0x2B2D31);

        const embed2 = new EmbedBuilder()
            .setTitle('Startup Regulations')
            .setDescription(`> - In this channel, you'll be notified when a session begins! Please don't request sessions or re-invites.
> - Don't inquire about sessions or start times. You'll be notified with the Sessions role when a session starts or for any re-invites. Violations will result in a mute.`)
            .setColor(0x2B2D31)
            .setFooter({
                text: 'Southwest Florida Roleplay Adventures',
                iconURL: 'https://cdn.discordapp.com/attachments/1212943927737589780/1271110625753563146/pixelcut-export-modified.png?ex=66b62585&is=66b4d405&hm=961b245cf5b91f61f75924db9516eecc1df0490f5edb5048689d228d8b9d6fbc&'
            });
            
        const button1 = new ButtonBuilder()
            .setCustomId('sping')
            .setLabel('Session Ping')
            .setStyle(ButtonStyle.Secondary);

        const row = new ActionRowBuilder()
            .addComponents(button1);

        await interaction.channel.send({ files: [image], embeds: [embed1, embed2], components: [row] });

        await interaction.reply({ content: 'Startup message sent.', ephemeral: true });
    },
};