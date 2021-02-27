
const chalk = require("chalk");
const moment = require("moment");
const Discord = require("discord.js");
const db = require('quick.db')
//plasma-db geçirebilirm istiorsan, bizim swnin çakma qdbsi, 120 satır bişey 
//giriş çıkış //giriş çıkış//giriş çıkış//giriş çıkış//giriş çıkış//giriş çıkış//giriş çıkış//giriş çıkış
module.exports = async(member) => {
	if (member.user.bot) return;
	let user = member.user;
	let channelID = db.get(`leaveChannel_${member.guild.id}`);
	if (channelID === null) return;
	let channel = member.guild.channels.cache.get(channelID);
	if (!channel) return;
	let leaveMsg = db.get(`leavemsg_${member.guild.id}`);
	if (leaveMsg === null) return;
	let send = leaveMsg
		.split('{member-tag}')
		.join(user.tag)
		.split('{member-username}')
		.join(user.username)
		.split('{member-id}')
		.join(user.id)
		.split('{member-created:duration}')
		.join(moment(user.createdTimestamp).fromNow())
		.split('{member-created:date}')
		.join(moment(user.createdTimestamp).format('YYYY/MM/DD'))
		.split('{server-name}')
		.join(member.guild.name)
		.split('{server-memberCount}')
		.join(member.guild.members.cache.size);
	const embedito1 = new Discord.MessageEmbed() .setDescription('RED') .setDescription(send);
	channel.send(embedito1);
}