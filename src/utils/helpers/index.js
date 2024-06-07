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

export function formatVND(number) {
    if (number === null) {
        return "";
    }
    return number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

export function getWorkingDays(month, year) {
    // Số ngày trong các tháng
    const daysInMonth = new Date(year, month, 0).getDate();
    let workingDays = 0;
    // Lặp qua từng ngày trong tháng
    for (let day = 1; day <= daysInMonth; day++) {
        const currentDate = new Date(year, month - 1, day);
        // Kiểm tra xem ngày đó là thứ 2 đến thứ 6
        if (currentDate.getDay() >= 1 && currentDate.getDay() <= 5) {
            workingDays++;
        }
    }
    return workingDays;
}
