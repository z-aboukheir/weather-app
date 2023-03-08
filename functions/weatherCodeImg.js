export default function weatherCodeImg ($weatherCode){

    switch ($weatherCode)
    {
        case 0:
            return "https://cdn-icons-png.flaticon.com/128/2222/2222384.png";
            // break;
        case 1:
        case 2:
            return "https://cdn-icons-png.flaticon.com/512/31/31304.png";
            // break;
        case 3:
            return "https://cdn-icons-png.flaticon.com/512/3222/3222791.png";
            // break;
        case 45:
        case 48:
            return "https://cdn-icons-png.flaticon.com/128/727/727789.png";
            // break;
        case 51:
        case 53:
        case 61:
        case 63:
        case 80:
        case 81:
            
return "https://cdn-icons-png.flaticon.com/128/6238/6238413.png"
            // break;
        case 55:
        case 65:
        case 82:
            return "https://cdn-icons-png.flaticon.com/128/2930/2930015.png";
            // break;
        case 56:
        case 57:
        case 66:
        case 67:
            return "https://cdn-icons-png.flaticon.com/128/6129/6129189.png";
            // break;
        case 71:
        case 73:
        case 75:
        case 77:
        case 85:
        case 86:
            return "https://cdn-icons-png.flaticon.com/128/2465/2465979.png";
            // break;
        case 95:
        case 96:
        case 99:
            return "https://cdn-icons-png.flaticon.com/128/3238/3238823.png";
            // break;
        default:
            return "https://t3.ftcdn.net/jpg/02/96/91/42/240_F_296914204_8F0EmCJh8nVo7c0MYJtwUdEqnG1xs6Bq.jpg";
            // break;

    }
 }