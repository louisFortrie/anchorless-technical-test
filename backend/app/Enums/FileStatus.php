<?php

namespace App\Enums;

enum FileStatus: string
{
    case UPLOADED = 'uploaded';
    case APPROVED = 'approved';
    case DISAPPROVED = 'disapproved';
    case IN_REVIEW = 'in review';
}
