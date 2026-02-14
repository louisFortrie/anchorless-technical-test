<?php

namespace App\Enums;

enum FileCategory: string
{
    case IDENTITY = 'Identity';
    case LEGAL = 'Legal';
    case SUPPORTING = 'Supporting';
}
