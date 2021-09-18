export const messageCombine={
    //alert error
    errorMessage:(status)=>{
        return `ERROR${status}`
    },
    khongLayDuocDuLieu:"Không lấy được dữ liệu",
    loiTrongQuaTrinhXuLy:"Lỗi trong quá trình xử lý",

    //alert success
    dangNhapThanhCong:"Đăng nhập thành công",
    datVeThanhCong:"Đặt vé thành công",
    dangKyThanhCong:"Đăng ký tài khoản thành công",
    capNhatThongTinThanhCong:"Cập nhật thông tin thành công",
    taoLichChieuThanhCong:"Tạo lịch chiếu thành công",
    xoaTaiKhoanThanhCong:(taiKhoan)=>{
        return `Xóa tài khoản ${taiKhoan} thành công`
    },
    themTaiKhoanThanhCong:(taiKhoan)=>{
        return `Thêm tài khoản ${taiKhoan} thành công`
    },
    xoaPhimThanhCong:(maPhim)=>{
        return `Xóa thành công phim có mã số ${maPhim}`
    },
    themPhimThanhCong:(tenPhim)=>{
        return `Thêm phim ${tenPhim} thành công`
    },
    capNhatPhimThanhCong:(tenPhim)=>{
        return `Cập nhật phim ${tenPhim} thành công`
    },

    //alert warning

    //alert info
}
export const descriptionCombine={
    //alert error
    errorDescription:(content)=>{
        return `${content}`
    },
    khongLayDuocDuLieu:"Có lỗi xảy ra trong quá trình lấy dữ liệu từ máy chủ. Vui lòng kiểm tra lại kết nối mạng.",
    loiTrongQuaTrinhXuLy:"Có lỗi xảy ra trong quá trình xử lý, vui lòng thử lại",

    //alert success
    datVeThanhCong:"Đặt vé thành công, vào phần tài khoản để kiểm tra",

    //alert warning

    //alert info
}
export const typeCombine={
    success:"success",
    info:"info",
    warning:"warning",
    error:"error"
}