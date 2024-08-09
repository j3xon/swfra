const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, PermissionFlagsBits, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('early')
        .setDescription('Sends the early access embed.')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.MuteMembers)
        .addStringOption(option =>
            option.setName('session-link')
                .setDescription('Link for the session so that EA people can join.')
                .setRequired(true)),
    async execute(interaction) {
        const sessionLink = interaction.options.getString('session-link');

        const embed = new EmbedBuilder()
            .setTitle('Early Access Session Link')
            .setDescription(`<@${interaction.user.id}> has released early access. Early Access members,content creators and nitro booster may join early at the link provided below.
                
                * If caught leaking the ea link or begging for it from a person would result in a server strike. If you have more questions open a ticket at <#1271080951669329982>`)
                .setColor(0x2B2D31)
                .setImage('https://cdn.discordapp.com/attachments/1256655891424346202/1271151768566366228/pixelcut-export_12.png?ex=66b64bd6&is=66b4fa56&hm=9cbc3e96189a60a8f45fce567a862f2ef04e68a7750ab922fd928b7a5d3d0930&')
                .setFooter({
                    text: 'Southwest Florida Roleplay Adventures',
                    iconURL: 'https://cdn.discordapp.com/attachments/1212943927737589780/1271110625753563146/pixelcut-export-modified.png?ex=66b62585&is=66b4d405&hm=961b245cf5b91f61f75924db9516eecc1df0490f5edb5048689d228d8b9d6fbc&'
                });

        const button = new ButtonBuilder()
            .setLabel('Early Access')
            .setStyle(ButtonStyle.Primary)
            .setCustomId('ea');

        const row = new ActionRowBuilder()
            .addComponents(button);

        await interaction.channel.send({ 
            content: '<@&1271087303544279041>, <@&1271088809328508958>, <@&1271086848583798794>', 
            embeds: [embed], 
            components: [row] 
        });

        await interaction.reply({ content: 'Early Access Sent.', ephemeral: true });

        const filter = i => i.customId === 'ea';
        const collector = interaction.channel.createMessageComponentCollector({ filter, componentType: ComponentType.Button, time: 9999999 });

        collector.on('collect', async i => {
            const logChannel = interaction.guild.channels.cache.get('1271089061112713310');
            if (logChannel) {
                await logChannel.send(`Interaction collected from ${i.user.tag} at ${new Date().toISOString()}`);
            }

            if (i.member.roles.cache.has('1271087303544279041') || 
                i.member.roles.cache.has('1271088809328508958') || 
                i.member.roles.cache.has('1271087384389484590') || 
                i.member.roles.cache.has('1271087254206419055') || 
                i.member.roles.cache.has('1271086998970433597') || 
                i.member.roles.cache.has('1271086848583798794')) {
                await i.reply({ content: `**Link:** ${sessionLink}`, ephemeral: true });
            } else {
                await i.reply({ 
                    content: 'You do not have this special role, given early access to some perks and content previews. If you wish to get this role, go to support ticket and follow the instructions. Start to enjoy all the benefits of being a holder of one of the special roles once you get the role!', 
                    ephemeral: true 
                });
            }
        });

        collector.on('end', async collected => {
            const logChannel = interaction.guild.channels.cache.get('1271089061112713310');
            if (logChannel) {
                await logChannel.send(`Collected ${collected.size} interactions.`);
            }
        });

        collector.on('error', async error => {
            const logChannel = interaction.guild.channels.cache.get('1271089061112713310');
            if (logChannel) {
                await logChannel.send(`Collector encountered an error: ${error}`);
            }
            console.error('Collector encountered an error:', error);
        });
    },
};
