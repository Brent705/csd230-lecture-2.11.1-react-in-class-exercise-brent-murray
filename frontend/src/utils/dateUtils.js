export const formatIssueDateForBackend = (dateStr) => {
    if (dateStr && dateStr.length === 16) return dateStr + ":00";
    return dateStr;
};

export const formatIssueDateForInput = (issue) => {
    if (!issue) return '';
    return typeof issue === 'string' ? issue.slice(0, 16) : '';
};