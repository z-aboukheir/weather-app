export default function weatherCodeImg ($weatherCode){

    switch ($weatherCode)
    {
        case 0:
            return "../assets/img/icon_sun.png";
            break;
        case 1:
        case 2:
            return "../assets/img/icon_sunBehindCloud.png";
            break;
        case 3:
            return "../assets/img/icon_cloud.png";
            break;
        case 45:
        case 48:
            return "../assets/img/icon_fog.png";
            break;
        case 51:
        case 53:
        case 61:
        case 63:
        case 80:
        case 81:
            return "../assets/img/icon_lightRain.png";
            break;
        case 55:
        case 65:
        case 82:
            return "../assets/img/icon_rain.png";
            break;
        case 56:
        case 57:
        case 66:
        case 67:
            return "../assets/img/icon_freeze.png";
            break;
        case 71:
        case 73:
        case 75:
        case 77:
        case 85:
        case 86:
            return "../assets/img/icon_snow.png";
            break;
        case 95:
        case 96:
        case 99:
            return "../assets/img/icon_thunderstorm.png";
            break;
        default:
            return "../assets/img/icon_noSync.png";
            break;

    }
 }