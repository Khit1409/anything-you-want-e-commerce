export default function LoginText() {
  return (
    <div className="flex-1 flex flex-col justify-center p-8 bg-slate-800 rounded-l-xl text-white">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold mb-2 text-white">Đăng Nhập</h1>
          <p className="text-slate-300 text-sm">
            Vui lòng đăng nhập để tiếp tục
          </p>
        </div>

        <div className="border-t border-slate-600 pt-6 space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded flex items-center justify-center bg-slate-700 shrink-0 mt-0.5">
              <span className="text-sm text-slate-300">✓</span>
            </div>
            <div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Bảo mật thông tin người dùng
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded flex items-center justify-center bg-slate-700 shrink-0 mt-0.5">
              <span className="text-sm text-slate-300">✓</span>
            </div>
            <div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Quản lý tài khoản dễ dàng
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded flex items-center justify-center bg-slate-700 shrink-0 mt-0.5">
              <span className="text-sm text-slate-300">✓</span>
            </div>
            <div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Hỗ trợ khách hàng tận tâm
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
