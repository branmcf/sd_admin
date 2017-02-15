import { Component, ViewEncapsulation } from '@angular/core';

export class Resource {
      user: string;
      data: {
        title: string;
        type: string;
        url: string;
        author: string;
        parent: string;
        description: string;
        categories: {
          A_hymn_written_prior_to_1970: boolean;
          Newly_composed_hymn_within_the_last_10_years: boolean;
          Song_by_local_church_musicians: boolean;
          Praise_and_Worship_Song_CCM: boolean;
          Psalm_Setting: boolean;
          Chant_Gregorian_Anglican_Pointed_or_Taize: boolean;
          Older_hymn_text_set_to_a_new_contemporary_tune_or_retuned: boolean;
          Song_from_another_country_or_World_Song: boolean;
          Secular_Song: boolean;
          Other: string;
        };
        topics: {
          Psalm_Setting: boolean;
          Lectionary_Based: boolean;
          Social_Justice: boolean;
          Worship: boolean;
          Other: string;
        };
        accompaniment: {
          Acappella: boolean;
          Organ: boolean;
          Piano: boolean;
          Guitar_no_band: boolean;
          Guitar_with_band: boolean;
          Orchestra: boolean;
          Handbells: boolean;
          Obligato: boolean;
          Other: string;
        };
        languages: {
          English: boolean;
          Spanish: boolean;
          French: boolean;
          Other: string;
        };
        ensembles: {
          Choir: boolean;
          Cantor: boolean;
          Song_Enlivener: boolean;
          Solo: boolean;
          Lead_Singer_from_Band_with_Other_Vocalists: boolean;
          Other: string;
        };
        ethnicities: {
          White: boolean;
          Black: boolean;
          Hispanic_Latinx_Caribbean: boolean;
          Native_American_Indigenous_Peoples: boolean;
          Asian: boolean;
          African: boolean;
          Middle_Eastern: boolean;
          Other: string;
        };
        hymn_soc_member: string;
        is_free: string;
        pract_schol: string;
      };
}