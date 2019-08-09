export interface InstagramProfile {
  logging_page_id: string;
  show_suggested_profiles: boolean;
  graphql: {
    user: {
      biography: string;
      profile_pic_url_hd: string;
    }
  };
}
