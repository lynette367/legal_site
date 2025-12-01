#!/usr/bin/env node

/**
 * 临时 SMTP 测试脚本
 * 使用 EMAIL_SERVER 环境变量初始化 Nodemailer，并尝试发送测试邮件
 */

const nodemailer = require("nodemailer");

function decodeEmailServer(server) {
  if (!server) {
    throw new Error(
      "EMAIL_SERVER environment variable is not set. Please configure it before running this script."
    );
  }

  try {
    return decodeURI(server);
  } catch (error) {
    console.warn("Failed to decode EMAIL_SERVER, using raw value.", error);
    return server;
  }
}

async function main() {
  const server = decodeEmailServer(process.env.EMAIL_SERVER);
  console.log("Using EMAIL_SERVER:", server);

  const transporter = nodemailer.createTransport(server);

  try {
    const result = await transporter.sendMail({
      to: "yqying95@gmail.com",
      from: process.env.EMAIL_FROM || "SMTP Tester <tester@example.com>",
      subject: "SMTP 测试（来自 test-smtp.js）",
      text: "这是一封测试邮件，用于验证 EMAIL_SERVER 配置是否正确。",
    });

    console.log("✅ SMTP 测试成功：", result);
  } catch (error) {
    console.error("❌ SMTP 测试失败：", error);
    if (error.response) {
      console.error("Server response:", error.response);
    }
    process.exitCode = 1;
  }
}

main();
