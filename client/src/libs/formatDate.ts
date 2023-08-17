import { format, parseISO } from "date-fns";

const formatDate = (date: string) => {
  const parseDate = parseISO(date);

  return format(parseDate, "d MMMM yyyy");
};

export default formatDate;
