//Project in beta
const Discord = require("discord.js")
const config = ("./config.js")
const client = new Discord.Client()
const token = config.discord.connections.token
const prefix = config.discord.customizations.prefix
const status = config.discord.customizations.status
const status_type = config.discord.customizations.status_type



client.on('ready', async() => {
    console.log("[-----------------------------------------]\n"+
                "     Username: "+client.user.username+
                "\n     ID: "+client.user.id+
                "\n     Tag: #"+client.user.discriminator+
                "\n     github.com/Ezermoz\n"+
                "[-----------------------------------------]")

                client.user.setPresence({ activity: { name: status, type: status_type }});
})


client.on('message', async message => {

    if(message.author.bot) return;
    if (message.channel.type === 'dm') return
    if(message.content.startsWith(`${prefix}help`)) {
            let help = new Discord.MessageEmbed()
                        .setColor('BLACK')
                        .setTimestamp()
                        .setDescription(`Prefix: ${prefix} \n All Disponible commands: \n
                        **CREATE TEXT CHANNELS** NAMED: \`#token-on\``)
                        .addField("Commands", "`help`")
                        .setTitle("Selfbot on Bot")
                        .setFooter(config.authors.opensource_url+" by "+config.authors.authors)
        return message.channel.send(help)
    }
    if (message.channel.name.includes("token-on")) {

       //message.channel.bulkDelete(1, true)

    var newClient = {};
        let wait = await message.channel.send("**Try to connected to the client !**")
        .catch(err => {message.channel.send("LOGGED ERROR ~ :x:"+": "+err)})
        await wait.react('⌛')
        .catch(err => {message.channel.send("MESSAGE ERROR ~ :x:"+": "+err)})
  
        newClient[message.author.id] = new Discord.Client({fetchAllMembers: true});
        newClient[message.author.id].login(message.content).catch(err => {
        message.channel.send("TOKEN ERROR ~ :x:`"+":` "+err);
        })
        await wait.edit("**Succefully Connected**")
}
})




client.login(token)
//#antiskid #inspirate-is-not-skid #ezermoz