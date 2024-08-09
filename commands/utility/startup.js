const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, PermissionsBitField} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('startup')
        .setDescription('Sends a startup embed')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.MuteMembers)
        .addIntegerOption(option =>
            option.setName('reactions')
                .setDescription('Amount of reactions for the session to occur')
                .setRequired(true)),
    async execute(interaction) {
        const reactions = interaction.options.getInteger('reactions');
        const user = interaction.user;

        const embed = new EmbedBuilder()
            .setTitle('Session Startup')
            .setDescription(`Welcome, <@${interaction.user.id}> is hosting a roleplay session, before you join the session make sure you read the information provided at <#1271066541500399707>.
                
                * Failing to follow staff orders would result in a server strike and you will be banned from the session.
                * Fail roleplaying would result in a server strike and server mute for 24 hours.

                For the session to start, the message needs **${reactions}**+ to start.`)
                .setColor(0x2B2D31)
                .setImage('https://cdn.discordapp.com/attachments/1256655891424346202/1271151935713579019/pixelcut-export_13.png?ex=66b64bfe&is=66b4fa7e&hm=31e9ecf137f25456d28e80989370b4cb492e21705489fbb365221d15532d4342&')
                .setFooter({
                    text: 'Southwest Florida Roleplay Adventures',
                    iconURL: 'https://cdn.discordapp.com/attachments/1212943927737589780/1271110625753563146/pixelcut-export-modified.png?ex=66b62585&is=66b4d405&hm=961b245cf5b91f61f75924db9516eecc1df0490f5edb5048689d228d8b9d6fbc&'
                });

        const message = await interaction.channel.send({
            content: '@everyone',
            embeds: [embed]
        });

        await message.react('✅');

        const newEmbed = new EmbedBuilder()
            .setTitle("Session Startup")
            .setDescription(`<@${interaction.user.id}> has started up a session in <#1271090691380088916>`)
            .setColor(0x2B2D31)
            .setFooter({
                text: 'Southwest Florida Roleplay Adventures',
                iconURL: 'https://cdn.discordapp.com/attachments/1212943927737589780/1271110625753563146/pixelcut-export-modified.png?ex=66b62585&is=66b4d405&hm=961b245cf5b91f61f75924db9516eecc1df0490f5edb5048689d228d8b9d6fbc&'
            });

        const targetChannel = await interaction.client.channels.fetch('1271089061112713310');
        await targetChannel.send({ embeds: [newEmbed] });

        const filter = (reaction, user) => reaction.emoji.name === '✅';

        const collector = message.createReactionCollector({ filter, time: 86400000 });

        collector.on('collect', (reaction, user) => {
            console.log(`Collected ${reaction.count} reactions`);
            if (reaction.count >= reactions) {
                const settingUpEmbed = new EmbedBuilder()
                    .setDescription('Setting up!')
                    .setColor(0x2B2D31)
                    .setFooter({
                        text: 'Southwest Florida Roleplay Adventures',
                        iconURL: 'https://cdn.discordapp.com/attachments/1212943927737589780/1271110625753563146/pixelcut-export-modified.png?ex=66b62585&is=66b4d405&hm=961b245cf5b91f61f75924db9516eecc1df0490f5edb5048689d228d8b9d6fbc&'
                    });
                interaction.channel.send({ embeds: [settingUpEmbed] });
                collector.stop();
            }
        });

        collector.on('end', collected => {
            console.log(`Collector ended. Total reactions: ${collected.size}`);
        });

        await interaction.reply({ content: `Message has been sent below.`, ephemeral: true });
    },
};
