<?php

namespace App\Services;

use App\Models\Wire;

class WireServices
{
    public function transformRequestNametoArray($requestBarcode)
    {

        // Проверяем наличие нужного количества скобок
        if (substr_count($requestBarcode, '(') < 3 || substr_count($requestBarcode, ')') < 2) {
            throw new \InvalidArgumentException("Неверный штрих-код: $requestBarcode");
        }

        $ypnFrom = $this->nth_occurrence($requestBarcode, ')', 1);
        $ypnTo = $this->nth_occurrence($requestBarcode, '(', 2);

        if ($ypnFrom === false || $ypnTo === false || $ypnTo <= $ypnFrom) {
            throw new \InvalidArgumentException("Ошибка выделения YPN в строке: $requestBarcode");
        }

        $ypn = substr($requestBarcode, $ypnFrom + 1, $ypnTo - $ypnFrom - 1);

        $barcodeFrom = $this->nth_occurrence($requestBarcode, ')', 2);
        $barcodeTo = $this->nth_occurrence($requestBarcode, '(', 3);

        if ($barcodeFrom === false || $barcodeTo === false || $barcodeTo <= $barcodeFrom) {
            throw new \InvalidArgumentException("Ошибка выделения Barcode в строке: $requestBarcode");
        }

        $barcode = substr($requestBarcode, $barcodeFrom + 1, $barcodeTo - $barcodeFrom - 1);

        return [
            'YPN' => trim($ypn),
            'barcode' => trim($barcode)
        ];
    }

    /**
     * Находит N-ное вхождение подстроки в строке.
     */
    protected function nth_occurrence($haystack, $needle, $nth = 1)
    {
        if ($nth <= 0) {
            return false;
        }

        $pos = 0;
        for ($i = 0; $i < $nth; $i++) {
            $pos = strpos($haystack, $needle, $pos);
            if ($pos === false) {
                return false;
            }
            $pos++; // Сдвигаемся дальше в строке
        }

        return $pos - 1; // Возвращаем корректную позицию
    }

    public function splitMaterialByTypeColorSize($material)
    {
        if (strlen($material) !== 8) {
            throw new \InvalidArgumentException("Некорректный формат материала: $material");
        }
        // Разделяем материалы по типу, цвету и размеру

        $type = substr($material, 0, 3);
        $size = substr($material, 3 , 3);
        $color = substr($material, 6  , 2);

        return [
            'type' => $type,
            'color' => $color,
            'size' => $size
        ];

    }
}
