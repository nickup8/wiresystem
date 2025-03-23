<?php

namespace App\Enum;

enum RolesEnum: string
{
    case LOGISTIC = 'logistic';
    case TECHNICAL = 'technical';
    case FEEDING = 'feeding';
    case MACHINE = 'machine';
    case USERMANAGER = 'user_manager';

    public function labels(): array
    {
        return [
            self::LOGISTIC->value => 'Логистика',
            self::TECHNICAL->value => 'Инженер-технолог',
            self::FEEDING->value => 'Оператор фидинга',
            self::MACHINE->value => 'Оператор Komax',
            self::USERMANAGER->value => 'Менеджер пользователей',
        ];
    }

    public function label(): string
    {
        return match ($this) {
            self::LOGISTIC => 'Логистика',
            self::TECHNICAL => 'Инженер-технолог',
            self::FEEDING => 'Оператор фидинга',
            self::MACHINE => 'Оператор Komax',
            self::USERMANAGER => 'Менеджер пользователей',
        };
    }
}
