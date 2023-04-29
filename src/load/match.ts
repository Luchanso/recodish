export type PicksBans = {
    is_pick: boolean;
    hero_id: number;
    team: 0 | 1;
    order: number;
};

export type Match = {
    result: {
        players: any[];
        radiant_win: boolean;
        duration: number;
        pre_game_duration: number;
        start_time: number;
        match_id: number;
        match_seq_num: number;
        tower_status_radiant: number;
        tower_status_dire: number;
        barracks_status_radiant: number;
        barracks_status_dire: number;
        cluster: number;
        first_blood_time: number;
        lobby_type: number;
        human_players: number;
        leagueid: number;
        positive_votes: number;
        negative_votes: number;
        game_mode: number;
        flags: number;
        engine: number;
        radiant_score: number;
        dire_score: number;
        picks_bans: PicksBans[];
    };
};
