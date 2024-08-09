const { SlashCommandBuilder, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, PermissionFlagsBits, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('information')
        .setDescription('Gives Server Information')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('Server Information')
            .setDescription(`Click through any button to get to know about the server rules, session guidelines, a session ping button which notifies you when a session starts/occurs, affiliate links.`)
            .setColor(0x2B2D31);

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
                    .setLabel('Affiliate Links')
                    .setDescription('Shows extra links related to our server.')
                    .setValue('afl')
            );

        const row = new ActionRowBuilder().addComponents(selectMenu);

        try {
            await interaction.reply({ content: 'Processing your request...', ephemeral: true });

            const userDM = await interaction.user.createDM();
            await userDM.send({ embeds: [embed], components: [row] });
        } catch (error) {
            console.error('Error sending embed messages:', error);
        }
    },
};
