const calenderHeader = document.getElementById('calenderHeader');
const calendarWeekDay = document.getElementById('calendarWeekDay');
const calendarContent = document.getElementById('calendarContent');
const yearElement = document.getElementById('year');
const monthElement = document.getElementById('month');
const langElement = document.getElementById('lang');
const calenderTypeElement = document.getElementById('calendarType');

const dayInfoModal = document.getElementById('dayInfoModal');
const modalBody = document.getElementById('modalBody');
const modelOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');

var SY = 1577917828 / 4320000; //solar year (365.2587565)
var LM = 1577917828 / 53433336; //lunar month (29.53058795)
var MO = 1954168.050623; //beginning of 0 ME
var SE3 = 1312; //beginning of 3rd Era
var SY = 1577917828 / 4320000; //solar year (365.2587565)
var SCR = ''; // Screen Size

const FullEnglishMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const FullWeekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const FullMmWeekDays = ['တနင်္ဂနွေ', 'တနင်္လာ', 'အင်္ဂါ', 'ဗုဒ္ဓဟူး', 'ကြာသာပတေး', 'သောကြာ', 'စနေ'];
const ShortWeekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// ["Hpusha", "Magha", "Phalguni", "Chitra","Visakha", "Jyeshtha", "Ashadha", "Sravana","Bhadrapaha", "Asvini", "Krittika", "Mrigasiras"];
const MyanmarYearNames = ['ပုဿနှစ်', 'မာခနှစ်', 'ဖ္လကိုန်နှစ်', 'စယ်နှစ်', 'ပိသျက်နှစ်', 'စိဿနှစ်', 'အာသတ်နှစ်', 'သရဝန်နှစ်', 'ဘဒြနှစ်', 'အာသိန်နှစ်', 'ကြတိုက်နှစ်', 'မြိက္ကသိုဝ်နှစ်'];

// ["First Waso", "Tagu", "Kason", "Nayon", "Waso", "Wagaung", "Tawthalin", "Thadingyut", "Tazaungmon", "Nadaw", "Pyatho", "Tabodwe", "Tabaung", "Late Tagu", "Late Kason"];
const FullMyanmarMonths = ['ပထမ ဝါဆို', 'တန်ခူး', 'ကဆုန်', 'နယုန်', 'ဝါဆို', 'ဝါခေါင်', 'တော်သလင်း', 'သီတင်းကျွတ်', 'တန်ဆောင်မုန်း', 'နတ်တော်', 'ပြာသို', 'တပိုတွဲ', 'တပေါင်း', 'နှောင်းတန်ခူး', 'နှောင်းကဆုန်'];
const ShortMyanmarMonths = ['ပ ဆို', 'ခူး', 'ဆုန်', 'ယုန်', 'ဆို', 'ခေါင်', 'လင်း', 'ကျွတ်', 'မုန်း', 'တော်', 'သို', 'တွဲ', 'ပေါင်း', 'နှောင်း ခူး', 'နှောင်း ဆုန်'];

// [0=waxing, 1=full moon, 2=waning, 3=new moon]
// [လဆန်း၊ လပြည့်၊ လဆုတ်၊ လကွယ်]
const FullMoonStatus = ['လဆန်း', 'လပြည့်', 'လဆုတ်', 'လကွယ်'];
const ShortMoonStatus = ['ဆန်း', 'ပြည့်', 'ဆုတ်', 'ကွယ်'];

// ['','Sabbath','Sabbath Eve']
const FullSabbaths = ['', 'ဥပုသ်', 'အဖိတ်'];
const ShortSabbaths = ['', 'ပုသ်', 'ဖိတ်'];

//const MonthTypes = ['ဦး', 'နှောင်း']; // [1=hnaung, 0= Oo]

// ["Thingyan Akyo","Thingyan Akya","Thingyan Akyat","Thingyan Atat","Myanmar New Year's Day"];
const FullThingyanHolidays = ["သင်္ကြန်အကြိုနေ့", "သင်္ကြန်အကျနေ့", "သင်္ကြန်အကြတ်နေ့", "သင်္ကြန်အတက်နေ့", "မြန်မာနှစ်ဆန်း ၁ ရက်နေ့"];
const ShortThingyanHolidays = ["အကြို", "အကျ", "အကြတ်", "အတက်", "နှစ်ဆန်း"];

const FullEnHolidays = ["နိုင်ငံတကာနှစ်သစ်ကူးနေ့", "လွတ်လပ်ရေးနေ့", "ပြည်ထောင်စုနေ့", "တောင်သူလယ်သမားနေ့", "တော်လှန်ရေးနေ့", "အလုပ်သမားနေ့", "အာဇာနည်နေ့", "ခရစ္စမတ်နေ့"];
const FullMmHolidays = ["ကဆုန်လပြည့် (ဗုဒ္ဓနေ့)", "ဝါဆိုလပြည့်", "သီတင်းကျွတ်လပြည့်", "တန်ဆောင်တိုင်", "အမျိုးသားနေ့", "ကရင်နှစ်သစ်ကူး", "တပေါင်းလပြည့်"];

window.onload = function () {
    const now = new Date();
    yearElement.value = now.getFullYear(); // 2025
    monthElement.value = now.getMonth(); // 0 - 11
    updateWindowSize();
};

function SetToday() {
    const now = new Date();
    yearElement.value = now.getFullYear();
    monthElement.value = now.getMonth();

    LoadWeekDayUI();
    LoadDate();
};

// Input: (v: value [1: increase, -1: decrease])
function ChangeMonth(v) {
    // Get current month and year
    let mn = Number(monthElement.value);
    let yn = Number(yearElement.value);

    // Adjust the month by the given value
    mn += v;

    // Handle month overflow or underflow
    if (mn < 0) {
        mn += 12;
        yn--;  // Decrease year if month goes below 1
    } else if (mn > 11) {
        mn -= 12;
        yn++;  // Increase year if month exceeds 12
    }

    // Adjust the selected month in the dropdown
    monthElement.value = mn;

    // Update the year input value
    yearElement.value = yn;

    // Refresh the UI
    LoadDate();
}

function LoadWeekDayUI() {
    let WeekDays = SCR == 'S' ? ShortWeekDays : FullWeekDays;
    let str = '';

    for (let i = 0; i < 7; i++) {
        str += `<div class="day-name d${i}">${WeekDays[i]}</div>`;
    }

    calendarWeekDay.innerHTML = str;
}

function LoadDate() {
    let year = parseInt(yearElement.value);
    let month = parseInt(monthElement.value);

    const now = new Date(); // Get current date for highlighting
    const today = now.getDate();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const firstDay = new Date(year, month, 1);
    const startDay = firstDay.getDay(); // 0 (Sunday) to 6 (Saturday)

    const lastDay = new Date(year, month + 1, 0); // 0 gets last day of previous month
    const numDays = lastDay.getDate();

    LoadTitle(year, month, numDays);

    let day = 1;
    let calendarHTML = `<div class="week-row">`;
    for (let i = 0; i < startDay; i++) {
        calendarHTML += `<div class="day"></div>`; // Empty cells before the first day
    }

    while (day <= numDays) {
        let classList = '';
        if (day === today && month === currentMonth && year === currentYear) { classList = ' today'; }
        const JD = w2j(year, month + 1, day);
        const { myt, my, mm, md } = j2m(JD);
        const sb = cal_sabbath(md, mm, myt);
        const mPre = (mm == 4 && myt > 0);
        const mp = cal_mp(md, mm, myt);
        const mf = cal_mf(md);

        let holiday = '';
        let h1 = mm_holiday(my, mm, md, mp);
        let h2 = en_holiday(year, month, day);
        let h3 = thingyan_holiday(JD, myt, my, mm, mp);
        if (h1 > -1 || h2 > -1 || h3 > -1) classList += ' holiday';
        if (SCR == 'S') {
            calendarHTML += `<div class="day${classList}" onclick="showDayInfo(${day}, ${JD})">
                <div class="row">
                    <span class="en-date">${day}</span>
                    <span class="sabbath-day">${ShortSabbaths[sb]}</span>
                </div>
                <div class="row center">${mPre ? 'ဒုတိယ' : ''} ${ShortMyanmarMonths[mm]}</div>
                <div class="row center">${ShortMoonStatus[mp]}</div>
                <div class="row center">${mmNumber(mf)}</div>
            </div>`;
        }
        else {
            if (h1 > -1) {
                holiday += `<div class="row center helight">${FullMmHolidays[h1]}</div>`;
            }
            if (h2 > -1) {
                holiday += `<div class="row center helight">${FullEnHolidays[h2]}</div>`;
            }
            if (h3 > -1) {
                holiday += `<div class="row center helight">${FullThingyanHolidays[h3]}</div>`;
            }

            calendarHTML += `<div class="day${classList}" onclick="showDayInfo(${day}, ${JD})">
                <div class="row">
                    <span class="en-date">${day}</span>
                    <span class="sabbath-day">${FullSabbaths[sb]}</span>
                </div>
                <div class="row center">${mPre ? 'ဒုတိယ' : ''} ${FullMyanmarMonths[mm]}</div>
                <div class="row center">${FullMoonStatus[mp]}</div>
                <div class="row center">${mmNumber(mf)}</div>
                ${holiday}
            </div>`;
        }

        day++;

        if ((startDay + day - 1) % 7 === 0) {  // Start a new row every 7 days
            calendarHTML += `</div><div class="week-row">`;
        }
    }

    while ((startDay + day - 1) % 7 !== 0) { // Fill remaining cells of the last row
        calendarHTML += `<div class="day"></div>`;
        day++;
    }

    calendarHTML += "</div>";

    calendarContent.innerHTML = calendarHTML;
}

function LoadTitle(year, month, lastDay) {
    const JDStart = w2j(year, month + 1, 1); // Julian Day for First Day of Month (2025 Feb 01)
    const JDEnd = w2j(year, month + 1, lastDay); // Julian Day for Last Day of Month (2025 Feb 28)
    const MYStart = j2m(JDStart);
    const MYEnd = j2m(JDEnd);

    // Sasanar Year
    const SYStart = cal_sy(MYStart.my, MYStart.mm, MYStart.md);
    const SYEnd = cal_sy(MYEnd.my, MYEnd.mm, MYEnd.md);

    let sasanarYear = '';
    if (SYStart !== SYEnd) {
        sasanarYear = `<div>သာသာနာနှစ် ${mmNumber(SYStart)} - ${mmNumber(SYEnd)}</div>`;
    }
    sasanarYear = `<div>သာသာနာနှစ် - ${mmNumber(SYStart)}</div>`;

    let myanmarYear = '';
    if (MYStart.my !== MYEnd.my) {
        myanmarYear = `<div>မြန်မာသက္ကရာဇ် ${mmNumber(MYStart.my)} - ${mmNumber(MYEnd.my)}</div>`;
    }
    myanmarYear = `<div>မြန်မာသက္ကရာဇ် - ${mmNumber(MYStart.my)}</div>`;

    const monthStartPrefix = (MYStart.mm == 4 && MYStart.myt > 0) ? 'ဒုတိယ' : '';
    const monthEndPrefix = (MYEnd.mm == 4 && MYEnd.myt > 0) ? 'ဒုတိယ' : '';

    myanmarMonth = `<div>${monthStartPrefix} ${FullMyanmarMonths[MYStart.mm]} - ${monthEndPrefix} ${FullMyanmarMonths[MYEnd.mm]}</div>`;

    calenderHeader.innerHTML = sasanarYear + myanmarYear + myanmarMonth;
}

// Calculate SasanarYear
function cal_sy(my, mm, md) {
    // var sy = my + 1182;
    var buddhistEraOffset = (mm == 1 || (mm == 2 && md < 16)) ? 1181 : 1182;
    return my + buddhistEraOffset;
}

//-------------------------------------------------------------------------
//Western date to Julian date
//Credit4 Gregorian2JD: http://www.cs.utsa.edu/~cs1063/projects/Spring2011/Project1/jdn-explanation.html
//input: (y: year, m: month, d: day, h=hour, n=minute, s=second,
// ct:calendar type [Optional argument: 0=British (default), 1=Gregorian, 2=Julian]
// SG: Beginning of Gregorian calendar in JDN [Optional argument: (default=2361222)])
//output: Julian date
function w2j(y, m, d, h = 12, n = 0, s = 0, SG = 2361222) {
    // 2361222-Gregorian start in British calendar (1752/Sep/14)
    var a = Math.floor((14 - m) / 12); y = y + 4800 - a; m = m + (12 * a) - 3;
    var jd = d + Math.floor((153 * m + 2) / 5) + (365 * y) + Math.floor(y / 4);
    jd = jd - Math.floor(y / 100) + Math.floor(y / 400) - 32045;

    return jd + t2d(h, n, s);
}

//Time to Fraction of day starting from 12 noon
//input: (h=hour, n=minute, s=second) output: (d: fraction of day)
function t2d(h, n, s) { return ((h - 12) / 24 + n / 1440 + s / 86400); }

//-------------------------------------------------------------------------
// Julian day number to Myanmar date
// input: (jdn -julian day number)
// output:  (
// myt =year type [0=common, 1=little watat, 2=big watat],
// my = year,
// mm = month [Tagu=1, Kason=2, Nayon=3, 1st Waso=0, (2nd) Waso=4, Wagaung=5, 
//   Tawthalin=6, Thadingyut=7, Tazaungmon=8, Nadaw=9, Pyatho=10, Tabodwe=11, 
//   Tabaung=12, Late Tagu=13, Late Kason=14 ],
// md = day of the month [1 to 30])
// dependency: cal_my(my)
function j2m(jdn) {
    jdn = Math.round(jdn);//convert jdn to integer
    var my, yo, dd, myl, mmt, a, b, c, e, f, mm, md;
    my = Math.floor((jdn - 0.5 - MO) / SY);//Myanmar year
    yo = cal_my(my);//check year
    dd = jdn - yo.tg1 + 1;//day count
    b = Math.floor(yo.myt / 2); c = Math.floor(1 / (yo.myt + 1)); //big wa and common yr
    myl = 354 + (1 - c) * 30 + b;//year length
    mmt = Math.floor((dd - 1) / myl);//month type: late =1 or early = 0
    dd -= mmt * myl; a = Math.floor((dd + 423) / 512); //adjust day count and threshold
    mm = Math.floor((dd - b * a + c * a * 30 + 29.26) / 29.544);//month
    e = Math.floor((mm + 12) / 16); f = Math.floor((mm + 11) / 16);
    md = dd - Math.floor(29.544 * mm - 29.26) - b * e + c * f * 30;//day
    mm += f * 3 - e * 4 + 12 * mmt; // adjust month numbers for late months

    return { myt: yo.myt, my: my, mm: mm, md: md };
}

//-------------------------------------------------------------------------
// Get moon phase from day of the month, month, and year type.
// input: (
//    md= day of the month [1-30], 
//    mm = month [Tagu=1, Kason=2, Nayon=3, 1st Waso=0, (2nd) Waso=4, Wagaung=5, 
//         Tawthalin=6, Thadingyut=7, Tazaungmon=8, Nadaw=9, Pyatho=10, Tabodwe=11,  
//         Tabaung=12, Late Tagu=13, Late Kason=14 ], 
//    myt = year type [0=common, 1=little watat, 2=big watat])
// output: (mp =moon phase [0=waxing, 1=full moon, 2=waning, 3=new moon])
function cal_mp(md, mm, myt) {
    var mml = cal_mml(mm, myt);
    return (Math.floor((md + 1) / 16) + Math.floor(md / 16) + Math.floor(md / mml));
}

//-------------------------------------------------------------------------
// Get fortnight day from month day
// input: ( md= day of the month [1-30])
// output: (mf= fortnight day [1 to 15])
function cal_mf(md) {
    return (md - 15 * Math.floor(md / 16));
}

//-------------------------------------------------------------------------
//Checking Astrological days
// More details @ http://cool-emerald.blogspot.sg/2013/12/myanmar-astrological-calendar-days.html
//-------------------------------------------------------------------------
// Get sabbath day and sabbath eve from day of the month, month, and year type.
// input: (
//    md= day of the month [1-30], 
//    mm = month [Tagu=1, Kason=2, Nayon=3, 1st Waso=0, (2nd) Waso=4, Wagaung=5, 
//         Tawthalin=6, Thadingyut=7, Tazaungmon=8, Nadaw=9, Pyatho=10, Tabodwe=11,  
//         Tabaung=12, Late Tagu=13, Late Kason=14 ], 
//    myt = year type [0=common, 1=little watat, 2=big watat])
// output: ( [1=sabbath, 2=sabbath eve, 0=else])
function cal_sabbath(md, mm, myt) {
    var mml = cal_mml(mm, myt);
    var s = 0; if ((md == 8) || (md == 15) || (md == 23) || (md == mml)) s = 1;
    if ((md == 7) || (md == 14) || (md == 22) || (md == (mml - 1))) s = 2;
    return s;
}

//-------------------------------------------------------------------------
// Check Myanmar Year
// input: (my -myanmar year)
// output:  (myt =year type [0=common, 1=little watat, 2=big watat],
// tg1 = the 1st day of Tagu as jdn_mm (Julian Day Number for MMT)
// fm = full moon day of [2nd] Waso as Julain Day Number
// werr= watat discrepancy [0=ok, 1= error] )
// dependency: cal_watat(my)
function cal_my(my) {
    var yd = 0, y1, nd = 0, werr = 0, fm = 0;
    var y2 = cal_watat(my); var myt = y2.watat;
    do { yd++; y1 = cal_watat(my - yd); } while (y1.watat == 0 && yd < 3);
    if (myt) {
        nd = (y2.fm - y1.fm) % 354; myt = Math.floor(nd / 31) + 1;
        fm = y2.fm; if (nd != 30 && nd != 31) { werr = 1; }
    }
    else fm = y1.fm + 354 * yd;
    var tg1 = y1.fm + 354 * yd - 102;
    return { myt: myt, tg1: tg1, fm: fm, werr: werr };
}

//-------------------------------------------------------------------------
// Check watat (intercalary month)
// input: (my = myanmar year)
// output:  ( watat = intercalary month [1=watat, 0=common]
//  fm = full moon day of 2nd Waso in jdn_mm (jdn+6.5 for MMT) [only valid when watat=1])
// dependency: GetMyConst(my)
function cal_watat(my) {//get data for respective era	
    var c = GetMyConst(my); // get constants for the corresponding calendar era
    var TA = (SY / 12 - LM) * (12 - c.NM); //threshold to adjust
    var ed = (SY * (my + 3739)) % LM; // excess day
    if (ed < TA) ed += LM;//adjust excess days
    var fm = Math.round(SY * my + MO - ed + 4.5 * LM + c.WO);//full moon day of 2nd Waso
    var TW = 0, watat = 0;//find watat
    if (c.EI >= 2) {//if 2nd era or later find watat based on excess days
        TW = LM - (SY / 12 - LM) * c.NM;
        if (ed >= TW) watat = 1;
    }
    else {//if 1st era,find watat by 19 years metonic cycle
        //Myanmar year is divided by 19 and there is intercalary month
        //if the remainder is 2,5,7,10,13,15,18
        //https://github.com/kanasimi/CeJS/blob/master/data/date/calendar.js#L2330
        watat = (my * 7 + 2) % 19; if (watat < 0) watat += 19;
        watat = Math.floor(watat / 12);
    }
    watat ^= c.EW;//correct watat exceptions	
    return { fm: fm, watat: watat };
}

// Get Myanmar year constants depending on era
// Thanks to Myo Zarny and Wunna Ko for earlier Myanmar years data
// input: my = myanmar year
// output:  
//  EI = Myanmar calendar era id [1-3] : calculations methods/constants depends on era
//  WO = watat offset to compensate
//  NM = number of months to find excess days
//  EW = exception in watat year
function GetMyConst(my) {
    var EI, WO, NM, EW = 0, i; var fme, wte;
    // The third era (the era after Independence 1312 ME and after)
    if (my >= 1312) {
        EI = 3; WO = -0.5; NM = 8;
        fme = [[1377, 1]];
        wte = [1344, 1345];
    }
    // The second era (the era under British colony: 1217 ME - 1311 ME)
    else if (my >= 1217) {
        EI = 2; WO = -1; NM = 4;
        fme = [[1234, 1], [1261, -1]];
        wte = [1263, 1264];
    }
    // The first era (the era of Myanmar kings: ME1216 and before)
    // Thandeikta (ME 1100 - 1216)
    else if (my >= 1100) {
        EI = 1.3; WO = -0.85; NM = -1;
        fme = [[1120, 1], [1126, -1], [1150, 1], [1172, -1], [1207, 1]];
        wte = [1201, 1202];
    }
    // Makaranta system 2 (ME 798 - 1099)
    else if (my >= 798) {
        EI = 1.2; WO = -1.1; NM = -1;
        fme = [[813, -1], [849, -1], [851, -1], [854, -1], [927, -1], [933, -1], [936, -1], [938, -1], [949, -1], [952, -1], [963, -1], [968, -1], [1039, -1]];
        wte = [];
    }
    // Makaranta system 1 (ME 0 - 797)
    else {
        EI = 1.1; WO = -1.1; NM = -1;
        fme = [[205, 1], [246, 1], [471, 1], [572, -1], [651, 1], [653, 2], [656, 1], [672, 1], [729, 1], [767, -1]];
        wte = [];
    }
    i = bSearch2(my, fme); if (i >= 0) WO += fme[i][1]; // full moon day offset exceptions
    i = bSearch1(my, wte); if (i >= 0) EW = 1; //correct watat exceptions

    return { EI: EI, WO: WO, NM: NM, EW: EW };
}

//-------------------------------------------------------------------------
// Get length of month from month, and year type.
// input: (
//    mm = month [Tagu=1, Kason=2, Nayon=3, 1st Waso=0, (2nd) Waso=4, Wagaung=5, 
//         Tawthalin=6, Thadingyut=7, Tazaungmon=8, Nadaw=9, Pyatho=10, Tabodwe=11,  
//         Tabaung=12, Late Tagu=13, Late Kason=14 ], 
//    myt = year type [0=common, 1=little watat, 2=big watat])
// output: (mml = length of the month [29 or 30 days])
function cal_mml(mm, myt) {
    var mml = 30 - mm % 2;//month length
    if (mm == 3) mml += Math.floor(myt / 2);//adjust if Nayon in big watat
    return mml;
}

//-----------------------------------------------------------------------------
// Search a 1D array
// input: (k=key,A=array)
// output: (i=index)
function bSearch1(k, A) {
    var i = 0; var l = 0; var u = A.length - 1;
    while (u >= l) {
        i = Math.floor((l + u) / 2);
        if (A[i] > k) u = i - 1;
        else if (A[i] < k) l = i + 1;
        else return i;
    }
    return -1;
}

//----------------------------------------------------------------------------
// Search first dimension in a 2D array
// input: (k=key,A=array)
// output: (i=index)
function bSearch2(k, A) {
    var i = 0; var l = 0; var u = A.length - 1;
    while (u >= l) {
        i = Math.floor((l + u) / 2);
        if (A[i][0] > k) u = i - 1;
        else if (A[i][0] < k) l = i + 1;
        else return i;
    } return -1;
}

function mmNumber(num) {
    const myanmarDigits = ["၀", "၁", "၂", "၃", "၄", "၅", "၆", "၇", "၈", "၉"];
    return String(num).split("").map(digit => myanmarDigits[digit]).join("");
}

function openModal() {
    dayInfoModal.classList.add('d-block');
    modelOverlay.classList.add('d-block');
}

function closeModal() {
    dayInfoModal.classList.remove('d-block');
    modelOverlay.classList.remove('d-block');
}

function showDayInfo(en_date, jd) {
    jd = Math.round(jd);

    //FullEnglishMonths
    let year = parseInt(yearElement.value);
    let month = parseInt(monthElement.value);
    let str = `<section style="margin-bottom:5px; padding-left:10px;"><div class="row">${year} ${FullEnglishMonths[month]} ${en_date}</div>`;
    str += `<div class="row">${FullWeekDays[(jd + 1) % 7]}</div></section>`;

    let { myt, my, mm, md } = j2m(jd);
    let mp = cal_mp(md, mm, myt);
    let wd = (jd + 2) % 7; //week day [0=sat, 1=sun, ..., 6=fri]
    let sasanarYear = cal_sy(my, mm, md);
    str += `<section style="margin-bottom:5px; padding-left:10px;"><div class="row">သာသာနာနှစ် ${mmNumber(sasanarYear)} ခု</div>`;
    str += `<div class="row">မြန်မာသက္ကရာဇ် ${mmNumber(my)} ခု</div>`;
    str += `<div class="row">${MyanmarYearNames[my % 12]}</div>`;

    let sb = cal_sabbath(md, mm, myt);
    let mPre = (mm == 4 && myt > 0);
    let mf = cal_mf(md);
    str += `<div class="row">${mPre ? 'ဒုတိယ' : ''} ${FullMyanmarMonths[mm]} ${FullMoonStatus[mp]} ${mmNumber(mf)} ရက်</div>`;
    str += `<div class="row">${FullMmWeekDays[(jd + 1) % 7]}နေ့</div></section>`;

    str += `<section style="margin-bottom:5px; padding-left:10px;"><div class="row helight">${FullSabbaths[sb]}</div></section>`;

    let h1 = mm_holiday(my, mm, md, mp);
    let h2 = en_holiday(year, month, en_date);
    let h3 = thingyan_holiday(jd, myt, my, mm, mp);
    str += `<section style="margin-bottom:5px; padding-left:10px;">`;
    if (h1 > -1) {
        str += `<div class="row helight">${FullMmHolidays[h1]}</div>`;
    }
    if (h2 > -1) {
        str += `<div class="row helight">${FullEnHolidays[h2]}</div>`;
    }
    if (h3 > -1) {
        str += `<div class="row helight">${FullThingyanHolidays[h3]}</div>`;
    }

    str += `</section>`;
    modalBody.innerHTML = str;
    openModal();
}

function updateWindowSize() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    let _SCR = width < 768 ? 'S' : 'M';

    if (SCR !== _SCR) {
        SCR = _SCR;
        LoadWeekDayUI();
        LoadDate();
    }
}

window.addEventListener('resize', updateWindowSize);
modalClose.addEventListener('click', closeModal);
modelOverlay.addEventListener('click', closeModal);

// Holiday based on Myanmar Calendar
function mm_holiday(my, mm, md, mp) {
    if ((mm == 2) && (mp == 1)) return 0; // Buddha Day ( Vesak day ) - ကဆုန်လပြည့် ( ဗုဒ္ဓနေ့ )
    else if ((mm == 4) && (mp == 1)) return 1; // Start of Buddhist Lent ( Warso day ) - ဝါဆိုလပြည့်
    else if ((mm == 7) && (mp == 1)) return 2; // End of Buddhist Lent - သီတင်းကျွတ်လပြည့်
    // else if ((my >= 1379) && (mm == 7) && (md == 14 || md == 16)) return 0; // Holiday
    else if ((mm == 8) && (mp == 1)) return 3; // Tazaungdaing - တန်ဆောင်တိုင်
    // else if ((my >= 1379) && (mm == 8) && (md == 14)) return 0; // Holiday 
    else if ((my >= 1282) && (mm == 8) && (md == 25)) return 4; // National Day - အမျိုးသားနေ့
    else if ((mm == 10) && (md == 1)) return 5; // Karen New Year's Day - ကရင်နှစ်သစ်ကူး
    else if ((mm == 12) && (mp == 1)) return 6; // Tabaung Pwe - တပေါင်းလပြည့်
    return -1;
}

// Holiday based on Gregorian Calendar
function en_holiday(y, m, d) {
    if ((y >= 2018 && y <= 2021) && (m == 0) && (d == 1)) return 0; // New Year's Day - နိုင်ငံတကာနှစ်သစ်ကူးနေ့
    else if ((y >= 1948) && (m == 0) && (d == 4)) return 1; // Independence Day - လွတ်လပ်ရေးနေ့
    else if ((y >= 1947) && (m == 1) && (d == 12)) return 2; // Union Day - ပြည်ထောင်စုနေ့
    else if ((y >= 1958) && (m == 2) && (d == 2)) return 3; // Peasants' Day - တောင်သူလယ်သမားနေ့
    else if ((y >= 1945) && (m == 2) && (d == 27)) return 4; // Resistance Day - တော်လှန်ရေးနေ့
    else if ((y >= 1923) && (m == 4) && (d == 1)) return 5; // Labour Day - အလုပ်သမားနေ့
    else if ((y >= 1947) && (m == 6) && (d == 19)) return 6; // Martyrs' Day - အာဇာနည်နေ့
    else if ((y >= 1752) && (m == 11) && (d == 25)) return 7; // Christmas Day - ခရစ္စမတ်နေ့
    return -1;
}

function thingyan_holiday(jdn, myt, my, mm, mp) {
    jdn = Math.round(jdn);
    let mmt = Math.floor(mm / 13);
    var BGNTG = 1100, SE3 = 1312;//start of Thingyan and third era
    var akn, atn, ja, jk;
    ja = SY * (my + mmt) + MO; // atat time
    if (my >= SE3) jk = ja - 2.169918982; // akya time
    else jk = ja - 2.1675;
    akn = Math.round(jk); atn = Math.round(ja);
    if ((my + mmt) >= BGNTG) {
        if (jdn == (akn - 1)) return 0; // Thingyan Akyo
        else if (jdn == akn) return 1;  // Thingyan Akya
        else if ((jdn > akn) && (jdn < atn)) return 2; // Thingyan Akyat
        else if (jdn == atn) return 3; // Thingyan Atat
    }
    if (jdn == (atn + 1)) return 4; // Myanmar New Year's Day
    return -1;
}