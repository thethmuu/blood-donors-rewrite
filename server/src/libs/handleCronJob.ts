import isAvailable from "../utils/isAvaliable";
import prisma from "./prisma";
import sendSMS from "./sendSMS";

const handleCronJob = async () => {
  const usersWithSubscription = await prisma.user.findMany({
    where: {
      isSubscribed: true,
    },
    select: {
      id: true,
      phone: true,
      donors: {
        include: {
          donations: true,
        },
      },
    },
  });

  const avaliableDonorsPhones = [];

  usersWithSubscription.forEach((user) => {
    user.donors.forEach((donor) => {
      if (donor.donations.length > 0) {
        const isAvailableDonor = isAvailable(donor);
        if (isAvailableDonor) {
          avaliableDonorsPhones.push(donor.phone);
        }
      }
    });
    const msgForExist = `ယနေ့သွေးလှူဒါန်းနိုင်သူ ${avaliableDonorsPhones.length} ဦးအားSMSပိုပြီးပါပြီ။ (BloodDonor App)`;
    const msgForNotExist = "ယနေ့သွေးလှူဒါန်းနိုင်သူ မရှိပါ။ (BloodDonor App)";
    const msgForAvailableDonors =
      "မင်္ဂလာပါ ယနေ့သွေးပြန်လည်လှူဒါန်းနိုင်ပါပြီ (ကန့်ဘီလူး သွေးလှူရှင်အသင်း)။";

    if (avaliableDonorsPhones.length > 0) {
      sendSMS(user.phone, msgForExist);

      avaliableDonorsPhones.forEach((phone) => {
        sendSMS(phone, msgForAvailableDonors);
      });
    } else {
      sendSMS(user.phone, msgForNotExist);
    }
  });
};

export default handleCronJob;
