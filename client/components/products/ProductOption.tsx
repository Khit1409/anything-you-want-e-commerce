import {
  ProductOption,
  ProductVariantOption,
} from "@/interfaces/response/product.response";
import Image from "next/image";

interface Props {
  onchangeOption: ({ key, value }: { key: string; value: string }) => void;
  options: Array<ProductOption>;
  optionsChosen: ProductVariantOption;
}

export default function ProductOptionSection({
  options,
  onchangeOption,
  optionsChosen,
}: Props) {
  return (
    <div className="my-3 space-y-4">
      <div className="border-b border-gray-300 py-2">
        <h4 className="uppercase font-semibold text-gray-700">
          Lựa chọn sản phẩm
        </h4>
      </div>
      {options.map((option, index) => (
        <div key={index}>
          <h4 className="mb-3 font-medium text-gray-800">{option.label}:</h4>
          <div className="flex flex-wrap gap-3">
            {option.values.map((value, valueIndex) => {
              const isSelected = optionsChosen[option.key] === value.value;
              return (
                <div key={valueIndex} className="text-center">
                  <button
                    type="button"
                    onClick={() => {
                      onchangeOption({ key: option.key, value: value.value });
                    }}
                    className={`relative rounded-lg border-2 overflow-hidden transition-all ${
                      isSelected
                        ? "border-green-500 shadow-md"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    {value.image && (
                      <div className="relative">
                        <Image
                          src={value.image}
                          alt={value.display}
                          width={100}
                          height={100}
                          className="rounded-t"
                        />
                        {isSelected && (
                          <div className="absolute top-1 right-1 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                            ✓
                          </div>
                        )}
                      </div>
                    )}
                    <div
                      className={`px-4 py-2 ${
                        isSelected
                          ? "bg-green-50 text-green-700 font-medium"
                          : "bg-white text-gray-700"
                      }`}
                    >
                      {value.display}
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
