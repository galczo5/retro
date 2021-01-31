export type Reaction = 'LOVED' | 'LIKED' | 'DISLIKED';
export type ReactionWithCreator = {
  readonly reaction: Reaction,
  readonly creator: string
};

