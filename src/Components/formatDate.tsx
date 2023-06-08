export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
  
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`;
  
    if (date.toDateString() === today.toDateString()) {
      return `Today (${formattedDate})`;
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return `Tomorrow (${formattedDate})`;
    } else {
      return `${date.toLocaleDateString('en-US', {
        weekday: 'long',
      })} (${formattedDate})`;
    }
  };
  