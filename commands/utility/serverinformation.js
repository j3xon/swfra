const { SlashCommandBuilder, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server-information')
        .setDescription('Gives Server Information')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
    async execute(interaction) {
        const image = "https://cdn.discordapp.com/attachments/1256655891424346202/1271156227803713557/pixelcut-export_18.png?ex=66b64ffd&is=66b4fe7d&hm=26c1540bd67d751f8b3185d3f3fb8ebd144fb04ab841e84ac19317065312b87d&";

        const embed1 = new EmbedBuilder()
            .setTitle('Server Information')
            .setDescription(`Southwest Florida Roleplay Adventures is developed for the sake of giving really high-quality experiences to car lovers across Roblox. Based on [Southwest Florida Beta](https://www.roblox.com/games/5104202731/Southwest-Florida-Beta), SWFRA hosts daily roleplay sessions with a dedicated staff team to assist. Show off your whips and meet fellow car enthusiasts.`)
            .setColor(0x2B2D31);

        const embed2 = new EmbedBuilder()
            .setTitle('Extra Information')
            .setDescription('Below is a list of buttons to know more about the server. If you have any more questions about this server, feel free to open a ticket in <#1271080951669329982>.')
            .setColor(0x2B2D31)
            .setFooter({
                text: 'Southwest Florida Roleplay Adventures',
                iconURL: 'https://cdn.discordapp.com/attachments/1212943927737589780/1271110625753563146/pixelcut-export-modified.png?ex=66b62585&is=66b4d405&hm=961b245cf5b91f61f75924db9516eecc1df0490f5edb5048689d228d8b9d6fbc&'
            });

        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId('information_select')
            .setPlaceholder('Select an option')
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('Server Information')
                    .setDescription('Information of the server.')
                    .setValue('sinfo'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Session Guidelines')
                    .setDescription('Guidelines for the session.')
                    .setValue('sguild'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Session Ping')
                    .setDescription('Get pinged when a session starts/occurs.')
                    .setValue('sping'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Affiliate Links')
                    .setDescription('Shows extra links related to our server.')
                    .setValue('afl')
            );

        const row = new ActionRowBuilder().addComponents(selectMenu);

        await interaction.reply({ content: 'Command Sent Below.', ephemeral: true });

        async function sendEmbedMessages() {
            await interaction.channel.send({ embeds: [embed1, embed2], components: [row], files: [image] });
        }

        try {
            await sendEmbedMessages();
        } catch (error) {
            console.error('Error sending embed messages:', error);
        }
    },
};
