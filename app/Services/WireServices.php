<?php

namespace App\Services;

use App\Models\Storage;
use App\Models\StorageWire;
use App\Models\Wire;
use App\Models\WireColor;
use App\Models\WireDetail;
use App\Models\WireSize;
use App\Models\WireType;

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

    public function getIdByDetais($material)
    {
        $type = WireType::where('barcode', $material['type'])->first();
        $size = WireSize::where('barcode', $material['size'])->first();
        $color = WireColor::where('barcode', $material['color'])->first();

        if (!$type || !$size || !$color) {
            throw new \InvalidArgumentException("Неверный штрих-код: " . $material['type'] . $material['size'] . $material['color']);
        }

        $wireDetail = WireDetail::where('wire_type_id', $type->id)
            ->where('wire_size_id', $size->id)
            ->where('wire_color_id', $color->id)
            ->first();

        if (!$wireDetail) {
            $wireDetail = WireDetail::create([
                'wire_type_id' => $type->id,
                'wire_size_id' => $size->id,
                'wire_color_id' => $color->id
            ]);
        }

        return $wireDetail->id;

    }

    public function getOrCreateWireAndAttachToStorage(array $data, Storage $storage, callable $createWireCallback): array
    {
        $barcodeArray = $this->transformRequestNametoArray($data['barcode']);
        $wire = Wire::where('barcode', $barcodeArray['barcode'])->first();

        $machinePrev = [];

        if (!$wire) {
            // Вызываем переданный колбэк для создания провода
            $wire = $createWireCallback();

            StorageWire::create([
                'storage_id' => $storage->id,
                'wire_id' => $wire->id,
            ]);
        } else {
            $storageWire = StorageWire::where('wire_id', $wire->id)->first();

            if (!$storageWire) {
                throw new \InvalidArgumentException("Катушка " . $data['barcode'] . " уже пуста");
            }

            $prevStorage = Storage::find($storageWire->storage_id);
            $machinePrev = $prevStorage->machine ?? [];

            $storageWire->update([
                'storage_id' => $storage->id,
            ]);
        }

        return [
            'wire' => $wire,
            'machinePrev' => $machinePrev,
        ];
    }



}
