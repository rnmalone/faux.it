import {EmployeeDTO} from "../entities/Employee";

const employees: EmployeeDTO[] = [
    {
        id: 1,
        firstName: 'Storton',
        lastName: 'Montgomery',
        jobTitle: 'Senior Sales Executive',
        division: 'Nautical',
        salary: 200000,
        commissionRate: 2,
        email: 'Stourton.montgomery@faux.it',
        joinDate: new Date(),
        profileImageUrl: '/assets/images/profile/1.jpg',
        bannerImageUrl: '/assets/images/banner/1.jpeg',
        locationId: 1,
    },
    {
        id: 2,
        firstName: 'Ophelia',
        lastName: 'Drayton-Clerk',
        jobTitle: 'Senior Sales Executive',
        division: 'Nautical',
        salary: 200000,
        commissionRate: 2,
        email: 'Ophelia.draytonclerk@faux.it',
        joinDate: new Date(),
        profileImageUrl: '/assets/images/profile/2.jpg',
        bannerImageUrl: '/assets/images/banner/2.jpeg',
        locationId: 1
    },
    {
        id: 3,
        firstName: 'Contstantine',
        lastName: 'Highbury',
        jobTitle: 'Sales Executive',
        division: 'Aerospace',
        salary: 300000,
        commissionRate: 1.5,
        email: 'Contstantine.Highbury@faux.it',
        joinDate: new Date(),
        profileImageUrl: '/assets/images/profile/3.jpg',
        bannerImageUrl: '/assets/images/banner/3.jpeg',
        locationId: 1
    },
    {
        id: 4,
        firstName: 'Maximillian',
        lastName: 'De-Volle IV',
        jobTitle: 'Sales Executive',
        division: 'Motor',
        salary: 75000,
        commissionRate: 5.5,
        email: 'Maximillian.devolle@faux.it',
        joinDate: new Date(),
        profileImageUrl: '/assets/images/profile/4.jpg',
        bannerImageUrl: '/assets/images/banner/4.jpeg',
        locationId: 2
    },
    {
        id: 5,
        firstName: 'Elijah',
        lastName: 'Hargreave-Brewer',
        jobTitle: 'Sales Executive',
        division: 'Motor',
        salary: 77550,
        commissionRate: 5.67,
        email: 'Elijah.HargreaveBrewer@faux.it',
        joinDate: new Date(),
        profileImageUrl: '/assets/images/profile/5.jpg',
        bannerImageUrl: '/assets/images/banner/5.jpeg',
        locationId: 2
    },
    {
        id: 6,
        firstName: 'Baz',
        lastName: '',
        jobTitle: 'Managing Director',
        division: 'Motor',
        salary: 10000000,
        commissionRate: 1,
        email: 'bazza@faux.it',
        joinDate: new Date(),
        profileImageUrl: '/assets/images/profile/6.jpg',
        bannerImageUrl: '/assets/images/banner/6.jpg',
        locationId: 6
    },
    {
        id: 7,
        firstName: 'Edwina',
        lastName: 'Chins-Ranton',
        jobTitle: 'Sales Executive',
        division: 'Motor',
        salary: 70000,
        commissionRate: 6,
        email: 'edwina.chinsranton@faux.it',
        joinDate: new Date(),
        profileImageUrl: '/assets/images/profile/7.jpg',
        bannerImageUrl: '/assets/images/banner/7.jpeg',
        locationId: 3
    },
    {
        id: 8,
        firstName: 'Prudence',
        lastName: 'Whitehall',
        jobTitle: 'Senior Sales Executive',
        division: 'Motor',
        salary: 90000,
        commissionRate: 6,
        email: 'prudence.whitehall@faux.it',
        joinDate: new Date(),
        profileImageUrl: '/assets/images/profile/8.jpg',
        bannerImageUrl: '/assets/images/banner/8.jpeg',
        locationId: 3
    },
    {
        id: 9,
        firstName: 'Dame Claudette',
        lastName: 'Winthrope',
        jobTitle: 'Sales Executive',
        division: 'Motor',
        salary: 70000,
        commissionRate: 6.1,
        email: 'claudette.winthrope@faux.it',
        joinDate: new Date(),
        profileImageUrl: '/assets/images/profile/9.jpg',
        bannerImageUrl: '/assets/images/banner/9.jpeg',
        locationId: 3
    },
    {
        id: 10,
        firstName: 'Miles',
        lastName: 'Izzard-Crew',
        jobTitle: 'Business Manager',
        division: 'Aerospace',
        salary: 200000,
        commissionRate: 2,
        email: 'miles.izzardcrew@faux.it',
        joinDate: new Date(),
        profileImageUrl: '/assets/images/profile/10.jpg',
        bannerImageUrl: '/assets/images/banner/10.jpeg',
        locationId: 2
    },
    {
        id: 11,
        firstName: 'Tobias',
        lastName: 'Forbes',
        jobTitle: 'Sales Manager',
        division: 'Aerospace',
        salary: 400000,
        commissionRate: 0,
        email: 'tobias.forbes@faux.it',
        joinDate: new Date(),
        profileImageUrl: '/assets/images/profile/11.jpg',
        bannerImageUrl: '/assets/images/banner/11.jpeg',
        locationId: 2
    },
    {
        id: 12,
        firstName: 'Antoinette',
        lastName: 'St.Claire',
        jobTitle: 'Sales Manager',
        division: 'Motor',
        salary: 92500,
        commissionRate: 3.56,
        email: 'antoinette.stclaire@faux.it',
        joinDate: new Date(),
        profileImageUrl: '/assets/images/profile/12.jpg',
        bannerImageUrl: '/assets/images/banner/12.jpeg',
        locationId: 5
    },
    {
        id: 13,
        firstName: 'Duke Sterling',
        lastName: 'Hillingham',
        jobTitle: 'Sales Executive',
        division: 'Motor',
        salary: 50000,
        commissionRate: 4.70,
        email: 'sterling.hillingham@faux.it',
        joinDate: new Date(),
        profileImageUrl: '/assets/images/profile/13.jpg',
        bannerImageUrl: '/assets/images/banner/13.jpeg',
        locationId: 5
    },
    {
        id: 14,
        firstName: 'Arthur',
        lastName: 'Garrington II',
        jobTitle: 'Business Manager',
        division: 'Motor',
        salary: 87000,
        commissionRate: 4.70,
        email: 'arthur.garrington@faux.it',
        joinDate: new Date(),
        profileImageUrl: '/assets/images/profile/14.jpg',
        bannerImageUrl: '/assets/images/banner/14.jpeg',
        locationId: 5
    },
    {
        id: 15,
        firstName: 'Claudette',
        lastName: 'Montcroix',
        jobTitle: 'Senior Sales Executive',
        division: 'Motor',
        salary: 76000,
        commissionRate: 4.70,
        email: 'claudette.montcroix@faux.it',
        joinDate: new Date(),
        profileImageUrl: '/assets/images/profile/15.jpg',
        bannerImageUrl: '/assets/images/banner/15.jpeg',
        locationId: 5
    },
    {
        id: 16,
        firstName: 'Mirabelle',
        lastName: 'Musgrave',
        jobTitle: 'Senior Sales Executive',
        division: 'Motor',
        salary: 76000,
        commissionRate: 4.70,
        email: 'mirabelee.musgrave@faux.it',
        joinDate: new Date(),
        profileImageUrl: '/assets/images/profile/16.jpg',
        bannerImageUrl: '/assets/images/banner/16.jpeg',
        locationId: 5
    },
    {
        id: 17,
        firstName: 'Lucretia',
        lastName: 'Breckenridge',
        jobTitle: 'Senior Sales Executive',
        division: 'Watches',
        salary: 120000,
        commissionRate: 4.70,
        email: 'lucretia.breckenridge@faux.it',
        joinDate: new Date(),
        profileImageUrl: '/assets/images/profile/17.jpg',
        bannerImageUrl: '/assets/images/banner/17.jpeg',
        locationId: 4
    },
    {
        id: 18,
        firstName: 'Matthias',
        lastName: 'Von Charmant III',
        jobTitle: 'Senior Sales Executive',
        division: 'Watches',
        salary: 120000,
        commissionRate: 4.70,
        email: 'mattias.charmant@faux.it',
        joinDate: new Date(),
        profileImageUrl: '/assets/images/profile/18.jpg',
        bannerImageUrl: '/assets/images/banner/18.jpeg',
        locationId: 4
    },
    {
        id: 19,
        firstName: 'Sir Terrance',
        lastName: 'DuClare I',
        jobTitle: 'Senior Sales Executive',
        division: 'Watches',
        salary: 120000,
        commissionRate: 7.70,
        email: 'terrence.duclare@faux.it',
        joinDate: new Date(),
        profileImageUrl: '/assets/images/profile/19.jpg',
        bannerImageUrl: '/assets/images/banner/19.jpeg',
        locationId: 1
    },
    {
        id: 20,
        firstName: 'Kaalinpää',
        lastName: 'Nälkäinen The Mighty',
        jobTitle: 'Sales Executive',
        division: 'Motor',
        salary: 80000,
        commissionRate: 6.40,
        email: 'mattias.charmant@faux.it',
        joinDate: new Date(),
        profileImageUrl: '/assets/images/profile/20.jpg',
        bannerImageUrl: '/assets/images/banner/20.jpeg',
        locationId: 4
    },
    {
        id: 21,
        firstName: 'Lóthurr',
        lastName: 'Kvasir',
        jobTitle: 'Sales Executive',
        division: 'Watches',
        salary: 80000,
        commissionRate: 4.40,
        email: 'lothurr.kvasir@faux.it',
        joinDate: new Date(),
        profileImageUrl: '/assets/images/profile/21.jpg',
        bannerImageUrl: '/assets/images/banner/21.jpeg',
        locationId: 2
    },
    {
        id: 22,
        firstName: 'Lady Bridgette',
        lastName: 'Conwyn',
        jobTitle: 'Sales Executive',
        division: 'Motor',
        salary: 91600,
        commissionRate: 4.40,
        email: 'bridgette.conwyn@faux.it',
        joinDate: new Date(),
        profileImageUrl: '/assets/images/profile/22.jpg',
        bannerImageUrl: '/assets/images/banner/22.jpeg',
        locationId: 2
    },
    {
        id: 23,
        firstName: 'Olivette',
        lastName: 'Forrest',
        jobTitle: 'Sales Executive',
        division: 'Motor',
        salary: 56000,
        commissionRate: 4.40,
        email: 'olivette.forrest@faux.it',
        joinDate: new Date(),
        profileImageUrl: '/assets/images/profile/23.jpg',
        bannerImageUrl: '/assets/images/banner/23.jpg',
        locationId: 2
    },
    {
        id: 24,
        firstName: 'Donald',
        lastName: 'Donaldson',
        jobTitle: 'Junior Sales Executive',
        division: 'Nautical',
        salary: 22000,
        commissionRate: 1.40,
        email: 'donald.donaldson@faux.it',
        joinDate: new Date(),
        profileImageUrl: '/assets/images/profile/24.jpg',
        bannerImageUrl: '/assets/images/banner/24.jpeg',
        locationId: 2
    },
    {
        id: 25,
        firstName: 'Enrique',
        lastName: 'Bolesławowic',
        jobTitle: 'Junior Sales Executive',
        division: 'Motor',
        salary: 22000,
        commissionRate: 2,
        email: 'enrique.boleslaowic@faux.it',
        joinDate: new Date(),
        profileImageUrl: '/assets/images/profile/25.jpg',
        bannerImageUrl: '/assets/images/banner/25.jpeg',
        locationId: 2
    },
    {
        id: 26,
        firstName: 'Logofăt Vladamir',
        lastName: 'Volgrad',
        jobTitle: 'Senior Sales Executive',
        division: 'Motor',
        salary: 115000,
        commissionRate: 7,
        email: 'vladamir.volgrad@faux.it',
        joinDate: new Date(),
        profileImageUrl: '/assets/images/profile/26.jpg',
        bannerImageUrl: '/assets/images/banner/26.jpg',
        locationId: 2
    },
    {
        id: 27,
        firstName: 'Helga',
        lastName: 'Windamir',
        jobTitle: 'Sales Manager',
        division: 'Watches',
        salary: 115000,
        commissionRate: 7,
        email: 'helga.windamir@faux.it',
        joinDate: new Date(),
        profileImageUrl: '/assets/images/profile/27.jpg',
        bannerImageUrl: '/assets/images/banner/27.jpeg',
        locationId: 2
    },
    {
        id: 28,
        firstName: 'Mawberry',
        lastName: 'St. Michael (GC)',
        jobTitle: 'Sales Executive',
        division: 'Electrical',
        salary: 36000,
        commissionRate: 10,
        email: 'vladamir.volgrad@faux.it',
        joinDate: new Date(),
        profileImageUrl: '/assets/images/profile/28.jpg',
        bannerImageUrl: '/assets/images/banner/28.jpeg',
        locationId: 7
    },
    {
        id: 29,
        firstName: 'Marttila',
        lastName: 'Ylöjärvi',
        jobTitle: 'Sales Executive',
        division: 'Electrical',
        salary: 36000,
        commissionRate: 10,
        email: 'martilla.ykigarvi@faux.it',
        joinDate: new Date(),
        profileImageUrl: '/assets/images/profile/29.jpg',
        bannerImageUrl: '/assets/images/banner/29.jpeg',
        locationId: 7
    },
    {
        id: 30,
        firstName: 'Nykänen',
        lastName: 'Hämeenkoski',
        jobTitle: 'Sales Manager',
        division: 'Electrical',
        salary: 45000,
        commissionRate: 11.5,
        email: 'nykanen.hameenkoski@faux.it',
        joinDate: new Date(),
        profileImageUrl: '/assets/images/profile/30.jpg',
        bannerImageUrl: '/assets/images/banner/30.jpeg',
        locationId: 7
    },
    {
        id: 31,
        firstName: 'Ojakangas',
        lastName: 'Uusikaupunki',
        jobTitle: 'Senior Sales Manager',
        division: 'Electrical',
        salary: 41770,
        commissionRate: 10.5,
        email: 'ojankangas.uusikaupunki@faux.it',
        joinDate: new Date(),
        profileImageUrl: '/assets/images/profile/31.jpg',
        bannerImageUrl: '/assets/images/banner/31.jpeg',
        locationId: 7
    },
    {
        id: 32,
        firstName: 'Schmiegel',
        lastName: 'Lempäälä',
        jobTitle: 'Sales Intern',
        division: 'Electrical',
        salary: 0,
        commissionRate: 25.5,
        email: 'nykanen.hameenkoski@faux.it',
        joinDate: new Date(),
        profileImageUrl: '/assets/images/profile/32.jpg',
        bannerImageUrl: '/assets/images/banner/32.jpeg',
        locationId: 7
    },
    {
        id: 33,
        firstName: 'Herleif',
        lastName: 'Bjørn',
        jobTitle: 'Sales Intern',
        division: 'Motor',
        salary: 18000,
        commissionRate: 2.5,
        email: 'herleif.bjorn@faux.it',
        joinDate: new Date(),
        profileImageUrl: '/assets/images/profile/33.jpg',
        bannerImageUrl: '/assets/images/banner/33.jpeg',
        locationId: 7
    },
    {
        id: 34,
        firstName: 'Ahmose',
        lastName: 'Menkauhor Kaiu',
        jobTitle: 'Sales Intern',
        division: 'Motor',
        salary: 18000,
        commissionRate: 2.5,
        email: 'ahmose.menkauhorkaiu@faux.it',
        joinDate: new Date(),
        profileImageUrl: '/assets/images/profile/35.jpg',
        bannerImageUrl: '/assets/images/banner/34.jpeg',
        locationId: 7
    },
    {
        id: 35,
        firstName: 'Xerxes',
        lastName: 'Shepseska',
        jobTitle: 'Sales Intern',
        division: 'Watches',
        salary: 18000,
        commissionRate: 2.5,
        email: 'xerxes.shepseska@faux.it',
        joinDate: new Date(),
        profileImageUrl: '/assets/images/profile/34.jpg',
        bannerImageUrl: '/assets/images/banner/35.jpeg',
        locationId: 7
    },
    {
        id: 36,
        firstName: 'Themistocles',
        lastName: 'Phrearrhii',
        jobTitle: 'Sales Manager',
        division: 'Watches',
        salary: 70000,
        commissionRate: 2.5,
        email: 'themistocles.phrearrhii@faux.it',
        joinDate: new Date(),
        profileImageUrl: '/assets/images/profile/36.jpg',
        bannerImageUrl: '/assets/images/banner/36.jpeg',
        locationId: 7
    },
    {
        id: 37,
        firstName: 'Æthelwulf',
        lastName: 'Pruitt',
        jobTitle: 'Sales Executive',
        division: 'Nautical',
        salary: 70000,
        commissionRate: 4,
        email: 'aethelwulf.pruitt@faux.it',
        joinDate: new Date(),
        profileImageUrl: '/assets/images/profile/37.jpg',
        bannerImageUrl: '/assets/images/banner/37.jpeg',
        locationId: 8
    },
    {
        id: 38,
        firstName: 'Kerberos',
        lastName: 'Tryphaina',
        jobTitle: 'Sales Executive',
        division: 'Nautical',
        salary: 70000,
        commissionRate: 4,
        email: 'kerberos.tryphania@faux.it',
        joinDate: new Date(),
        profileImageUrl: '/assets/images/profile/38.jpg',
        bannerImageUrl: '/assets/images/banner/38.jpeg',
        locationId: 8
    },
    {
        id: 39,
        firstName: 'Matilda',
        lastName: 'Ætheling',
        jobTitle: 'Sales Executive',
        division: 'Aerospace',
        salary: 46000,
        commissionRate: 8,
        email: 'matilda.aetheling@faux.it',
        joinDate: new Date(),
        profileImageUrl: '/assets/images/profile/39.jpg',
        bannerImageUrl: '/assets/images/banner/39.jpeg',
        locationId: 8
    },
    {
        id: 40,
        firstName: 'Arglwyddes',
        lastName: 'Myfanwy',
        jobTitle: 'Sales Executive',
        division: 'Aerospace',
        salary: 46000,
        commissionRate: 8,
        email: 'arglwyddes.myfanwy@faux.it',
        joinDate: new Date(),
        profileImageUrl: '/assets/images/profile/40.jpg',
        bannerImageUrl: '/assets/images/banner/40.jpeg',
        locationId: 8
    },
    {
        id: 41,
        firstName: 'Maddox',
        lastName: 'Vesistriphios',
        jobTitle: 'Sales Executive',
        division: 'Aerospace',
        salary: 70000,
        commissionRate: 8,
        email: 'maddox.vestriphios@faux.it',
        joinDate: new Date(),
        profileImageUrl: '/assets/images/profile/41.jpg',
        bannerImageUrl: '/assets/images/banner/41.jpeg',
        locationId: 8
    },
    {
        id: 42,
        firstName: 'Vasiliki',
        lastName: 'Zotikos',
        jobTitle: 'Sales Executive',
        division: 'Nautical',
        salary: 65000,
        commissionRate: 8,
        email: 'vasiliki.zotikos@faux.it',
        joinDate: new Date(),
        profileImageUrl: '/assets/images/profile/42.jpg',
        bannerImageUrl: '/assets/images/banner/42.jpeg',
        locationId: 8
    }
]

export default employees
