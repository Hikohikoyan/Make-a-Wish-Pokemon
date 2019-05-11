<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNewCustomWish extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('custom_wish', function (Blueprint $table) {
            $table->integer('id')->autoIncrement();
            $table->text('wish_content');
            $table->text('wisher_id');
            $table->text('helper_id');
            $table->text('situation');
            $table->text('wisher_open');
            $table->text('helper_open');
            $table->text('ball_path');
            $table->text('fairy_path');
            $table->text('time');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('new_custom_wish');
    }
}
