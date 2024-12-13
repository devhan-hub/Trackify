import dayjs from "dayjs";
import { format, isToday, isTomorrow, isYesterday, parseISO } from 'date-fns';

 export  const getDateStatus = (dueDate) => {
    if (!dueDate) return '';
    const date = dueDate.toDate()
    const isoString = date.toISOString()
   
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    if (isYesterday(date)) return 'Yesterday';
    return format(date, 'dd/MM/yyyy');
  }
  
export  const isOverDue = (dueDate) => {
  
    const parseDueDate = dayjs(dueDate.toDate());
  
    const today = dayjs().startOf('day');
  
    return parseDueDate.isBefore(today, 'day');
  
  }
  

export const priorityColor = (value) => {
    switch (value) {
      case 'extreme':
        return 'text-[#ff0000]'
        break;
      case 'moderate':
        return 'text-[#32CD32]'
        break;
      case 'low':
        return 'text-[#a8d8f2]'
        break;
      default:
        return 'text-[#1E90FF]'
        break;
    }
  }

