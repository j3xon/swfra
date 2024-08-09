const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup-ticket')
        .setDescription('Create a ticket')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });

        const image = "https://cdn.discordapp.com/attachments/1271127242042376222/1271361058296303626/pixelcut-export_20.png?ex=66b70ec1&is=66b5bd41&hm=340396cab5f5dc4a7748664d89fdca7a3f7d848599ce88c851ad2c1117d1e0d6&";

        const embed = new EmbedBuilder()
            .setTitle('SWFRA | Server Support')
            .setDescription('Select the appropriate option from the dropdown menu to open your ticket. Be patient as our support team might be occupied. Submitting troll tickets will lead to a violation. After opening a ticket, you will receive further instructions.')
            .setColor(0x2B2D31)
            .setFooter({
                text: 'Southwest Florida Roleplay Adventures',
                iconURL: 'https://cdn.discordapp.com/attachments/1212943927737589780/1271110625753563146/pixelcut-export-modified.png'
            });

        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId('ticket_select')
            .setPlaceholder('Select an option')
            .addOptions([
                { label: 'Staff Report', description: 'Report a staff member.', value: 'staff_report' },
                { label: 'Civilian Report', description: 'Report a civilian.', value: 'civ_report' },
                { label: 'General Support', description: 'Get general support.', value: 'general_support' },
            ]);

        const row = new ActionRowBuilder().addComponents(selectMenu);

        await interaction.channel.send({ embeds: [embed], components: [row], files: [image] });
        await interaction.editReply({ content: 'Command sent!' });
    },
};
