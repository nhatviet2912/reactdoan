export function formatDate(value) {
    if (value != null) {
        const date = new Date(value);

        if (isNaN(date.getTime())) {
            return '';
        }

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }
    return '';
}

export function formatGender(gender) {
    return gender === 0 ? 'Nữ' : 'Nam';
}

export function formartStatus(status) {
    return status === 0 ? (
        <div
            style={{
                padding: '0 4px',
                background: '#1cbb8c',
                color: '#fff',
                borderRadius: '10px',
                textAlign: 'center',
            }}
        >
            Đang làm việc
        </div>
    ) : (
        <div
            style={{
                padding: '0 4px',
                background: '#f32424',
                color: '#fff',
                borderRadius: '10px',
                textAlign: 'center',
            }}
        >
            Đã nghỉ việc
        </div>
    );
}

export function downloadFile(data, fileName) {
    const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}
