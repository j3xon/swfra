const { SlashCommandBuilder, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('staff-information')
        .setDescription('Gives Server Information')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
    async execute(interaction) {
        const image = "https://cdn.discordapp.com/attachments/1256655891424346202/1271152097001209877/pixelcut-export_14.png?ex=66b64c24&is=66b4faa4&hm=c9586a4d51260e2bcc447fd1f8e932149a436c53abe350d49a9e2a7496070e2d&";

        const embed1 = new EmbedBuilder()
            .setTitle('Staff Information')
            .setDescription(`Southwest Florida Roleplay Adventures is developed for the sake of giving really high-quality experiences to car lovers across Roblox. So as a staff member you must follow all the rules provided below and follow rules from HR.`)
            .setColor(0x2B2D31)
            .setFooter({
                text: 'Southwest Florida Roleplay Adventures',
                iconURL: 'https://cdn.discordapp.com/attachments/1212943927737589780/1271110625753563146/pixelcut-export-modified.png?ex=66b62585&is=66b4d405&hm=961b245cf5b91f61f75924db9516eecc1df0490f5edb5048689d228d8b9d6fbc&'
            });

        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId('staff_info')
            .setPlaceholder('Select an option')
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('Staff Information')
                    .setDescription('Staff Information')
                    .setValue('staffinfo'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Session Commands')
                    .setDescription('Session commands')
                    .setValue('scommands'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Extra Information')
                    .setDescription('Shows extra information')
                    .setValue('extra')
            );

        const row = new ActionRowBuilder().addComponents(selectMenu);

        await interaction.reply({ content: 'Command Sent Below.', ephemeral: true });

        async function sendEmbedMessages() {
            await interaction.channel.send({ 
                content: '<@&1271086268347842690>', 
                embeds: [embed1], 
                files: [image], // Added image here
                components: [row] 
            });
        }

        try {
            await sendEmbedMessages();
        } catch (error) {
            console.error('Error sending embed messages:', error);
        }
    },
};
